import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> | Promise<Observable<T>> {
    return next.handle().pipe(
      map(data => {
        return plainToClass(this.dto, data, {
          strategy: 'exposeAll',
        });
      }),
    );
  }
}
