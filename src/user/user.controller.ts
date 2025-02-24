import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { User } from './user';
import { data } from '../data';
import { UserServices } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userServices:UserServices) {}
    //ici ajouter un obj à data 
    
      @Get()
      getAllUsers() {
        return this.userServices.findAll()
      }

      @Get(':id')
      getOneUser(@Param('id') id: string) {
        return this.userServices.findById(Number(id))
      }

      @Post()
      createUser(@Body() userDto:User) {
        return this.userServices.createUser(userDto)
      }

}