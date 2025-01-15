import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';

export type ApiResponse<T> = {
  statusCode: number;
  data: T;
};

@Injectable()
export class ResponseFormatInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> | Promise<Observable<ApiResponse<T>>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();
    return next
      .handle()
      .pipe(
        map(data => ({ statusCode: response.statusCode, message: this.reflector.get<string>('response_message', context.getHandler()) || '', data })),
      );
  }
}
