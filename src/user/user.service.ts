import { User } from '../user/user';
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { data } from '../data';

@Injectable()
export class UserServices {
    private users: User[] = [];

    constructor() {
        this.users = data
    }   

    //@Post()
    findAll(): User[] {
        return this.users;
    }

    findById(id: number) {
        return this.users.find(ref => ref.id === id);
    }

    createUser(newUser: User) {
        this.users.push(newUser);
        return newUser;
    }
} 