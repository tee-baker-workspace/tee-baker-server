import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '@modules/prisma/prisma.service';

import { SecurityService } from '@shared/modules/security.service';

import { CreateUserDTO } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { USER_MODULE_ERRORS } from './utils/errorMessages';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService, private readonly securityService: SecurityService) {}

  async createUser(payload: CreateUserDTO) {
    const { password, ...restPayload } = payload; // Ensre

    try {
      const passwordHash = await this.securityService.createPasswordHash(password);
      const userCreated = await this.prismaService.user.create({ data: { ...restPayload, password: passwordHash } });
      return userCreated;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ForbiddenException(USER_MODULE_ERRORS.userAlreadyExists);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: string) {
    try {
      const user = await this.prismaService.user.findFirstOrThrow({ where: { id } });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(USER_MODULE_ERRORS.userNotFoundById(id));
      }
      throw new InternalServerErrorException(error);
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findFirstOrThrow({ where: { email } });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(USER_MODULE_ERRORS.userNotFoundByEmail(email));
      }
      throw new InternalServerErrorException(error);
    }
  }

  async findAllUsers() {
    try {
      const users = await this.prismaService.user.findMany();
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateUser(id: string, body: UpdateUserDto) {
    try {
      // find user by id
      await this.prismaService.user.findFirstOrThrow({ where: { id: id } });

      const updatedUser = this.prismaService.user.update({ data: body, where: { id: id } });
      return updatedUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(USER_MODULE_ERRORS.userNotFoundById(id));
      }
      throw new InternalServerErrorException(error);
    }
  }

  async deleteUser(id: string) {
    //
  }
}
