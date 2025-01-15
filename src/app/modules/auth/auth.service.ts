import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as R from 'ramda';
import { generateRandomUsername } from 'shared-utils';

import { UsersService } from '@modules/users/users.service';
import { SecurityService } from '@shared/modules/security.service';

import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly securityService: SecurityService,
    private readonly userService: UsersService,
  ) {}
  async login(body: LoginDTO) {
    const { email, password } = body;

    const userFound = await this.userService.findOneByEmail(email);

    const passwordMatched = await this.securityService.verifyHashedPassword(userFound.password, password);
    if (!passwordMatched) throw new UnauthorizedException();

    const accessToken = await this.securityService.createAccessToken(userFound.id, email);
    return accessToken;
  }

  async register(body: RegisterDTO) {
    const payload = R.pickAll(['full_name', 'email', 'password'], body);

    // generate random username based on email
    const userName = generateRandomUsername(payload?.email);
    const payloadWithEmail = { ...payload, user_name: userName };

    // create user in db
    const userCreated = await this.userService.createUser(payloadWithEmail);

    // generate access token
    const accessToken = await this.securityService.createAccessToken(userCreated.id, userCreated.email);

    return accessToken;
  }

  async verifySession(id: string) {
    const user = await this.userService.findOneById(id);
    return user;
  }
}
