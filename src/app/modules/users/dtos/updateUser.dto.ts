import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { IUpdateUserPayload } from 'shared-utils';

export class UpdateUserDto implements IUpdateUserPayload {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  @IsString()
  phone_number?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['male', 'female', 'other'])
  gender?: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dob?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bio?: string;
}
