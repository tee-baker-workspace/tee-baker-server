import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from '@modules/auth/auth.module';
import { JwtAuthGuard } from '@modules/auth/guards/jwt.guard';
import { PrismaModule } from '@modules/prisma/prisma.module';

import { SecurityModule } from '@shared/modules';

@Module({
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true }), SecurityModule, AuthModule],
})
export class AppModule {}
