import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as argon from 'argon2';

type JwtPayloadType = {
  sub: string;
  email: string;
};

@Injectable()
export class SecurityService {
  constructor(private readonly jwtService: JwtService) {}

  async createAccessToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return await this.jwtService.signAsync(payload);
  }

  async verifyAccessToken(token: string) {
    const payload = await this.jwtService.verifyAsync<JwtPayloadType>(token);
    return payload;
  }

  async createPasswordHash(password: string) {
    const hashedPassword = await argon.hash(password);
    return hashedPassword;
  }

  async verifyHashedPassword(hashedPassword: string, password: string) {
    const isVerified = await argon.verify(hashedPassword, password);
    return isVerified;
  }
}
