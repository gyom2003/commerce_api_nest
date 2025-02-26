import {Body, Controller, Get, Post, Req, UseGuards,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from 'src/common/guard/acessToken.guard';
import { RequestWithUser } from 'src/auth/dto/request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data)
  }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: RequestWithUser) {
    this.authService.logout(req.user['sub']);
  }
}
