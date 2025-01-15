import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { IAccessTokenResponse, IAuthSessionResponse } from 'shared-utils';

import { Public, ResponseMessage } from '@shared/decorators';

import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('verify-session')
  @ResponseMessage('Session is verified')
  async verifySession(@Req() req: Request): Promise<IAuthSessionResponse> {
    const userId = req?.user?.userId;
    const user_meta = await this.authService.verifySession(userId);
    return { user_meta };
  }

  @Public()
  @Post('login')
  @ResponseMessage('Logged In Successfully!')
  async login(@Body() body: LoginDTO): Promise<IAccessTokenResponse> {
    const access_token = await this.authService.login(body);
    return { access_token };
  }

  @Public()
  @Post('register')
  @ResponseMessage('Registered Successfully!')
  async register(@Body() body: RegisterDTO): Promise<IAccessTokenResponse> {
    const access_token = await this.authService.register(body);
    return { access_token };
  }
}
