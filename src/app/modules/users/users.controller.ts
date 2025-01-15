import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ResponseMessage } from '@shared/decorators';

import { UpdateUserDto } from './dtos/updateUser.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  @ResponseMessage('Fetched all users')
  async getAllUsers() {
    const users = await this.userService.findAllUsers();
    return { users };
  }

  @Patch(':id')
  @ResponseMessage('User updated successfully!')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, body);
    return { user: updatedUser };
  }
}
