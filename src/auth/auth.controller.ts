import {Body, Controller, Get, NotFoundException, Post, Req, UseGuards,} from '@nestjs/common';
import { AuthService } from './auth.service';
//import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from 'src/common/guard/acessToken.guard';
import { RequestWithUser } from 'src/auth/dto/request.dto';
import { RefreshTokenGuardClass } from 'src/common/guard/refreshToken.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly userService: UsersService) {}

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

  @UseGuards(RefreshTokenGuardClass)
  @Get('refresh')
  refreshToken(@Req() req: RequestWithUser) {
    const userId = req.user['sub']
    const refreshToken = req.user['refreshToken']
    return this.authService.refreshTokens(refreshToken, userId)
  }

  @UseGuards(RefreshTokenGuardClass)
  @Get('me')
  getMeMethod(@Req() req: RequestWithUser) {
    const userId = req.user['sub']
    const refreshToken = req.user['refreshToken']
    const user = this.userService.findById(userId)
    console.log("ici user get by id before login ==>", user)
    if (!user) {
      throw new NotFoundException('User not found from the back')
    }
    return {
      hasRefreshToken: !!refreshToken
    }
  }
}
