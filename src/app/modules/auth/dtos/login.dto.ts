import { PickType } from '@nestjs/swagger';
import { ILoginUser } from 'shared-utils';

import { CreateUserDTO } from '@modules/users/dtos/createUser.dto';

export class LoginDTO extends PickType(CreateUserDTO, ['email', 'password']) implements ILoginUser {}
