import { SetMetadata, UseInterceptors } from '@nestjs/common';

import { SerializeInterceptor } from '../interceptors/SerializeInterceptor';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Serialize = <T>(dto: T) => UseInterceptors(new SerializeInterceptor(dto));
export const ResponseMessage = (message: string) => SetMetadata('response_message', message);
