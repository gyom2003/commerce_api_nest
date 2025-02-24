import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServices } from './user.service';
import { Controller, Get } from '@nestjs/common';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserServices],
})

export class UserModule {
    constructor(
        private readonly userServices: UserServices,
    )
    {
        console.log(userServices)
    }
}
