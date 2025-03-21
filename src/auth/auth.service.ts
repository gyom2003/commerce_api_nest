import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService, 
        private readonly jwtService: JwtService, 
        private readonly configServices: ConfigService,
    ) {}

    hashMethod(data: string) {
        return argon2.hash(data)
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashMethod(refreshToken)
        await this.userService.update(userId, {
            refreshToken: hashedRefreshToken
        })
    }

    async getAllTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configServices.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '15m'
                }
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configServices.get('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                }
            )
        ]);
        return {
            accessToken, 
            refreshToken,
        }
    }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        const userExists = await this.userService.findByUserEmail(
            createUserDto.email,
        );
        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        const hash = await this.hashMethod(createUserDto.password)
        console.log("signup controller DTO =>", createUserDto)
        const newUser = await this.userService.create({
            ...createUserDto, 
            password: hash
        });
        //ici déterminer token
        const newuserRef = newUser
        if (newuserRef) {
            const tokens = await this.getAllTokens(newUser._id.toString(), newUser.username)
            await this.updateRefreshToken(newUser._id.toString(), tokens.refreshToken)
            return tokens;
        }
    }

    async signIn(data: AuthDto) {
        console.log("ici data depuis front =>", data)
        const userAuth = await this.userService.findByUserEmail(data.username);
        if (!userAuth) {
            throw new BadRequestException('user dont exist')
        }
        const passwordMatch = await argon2.verify(userAuth.password, data.password)
        if (!passwordMatch) {
            throw new BadRequestException('Password or Username exception')
        }
        const tokens =  await this.getAllTokens(userAuth._id.toString(), userAuth.username)
        await this.updateRefreshToken(userAuth._id.toString(), tokens.refreshToken)
        return tokens;
    }

    async logout(userId: string) {
        return this.userService.update(userId, { refreshToken: undefined })
    }

    async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.userService.findById(userId);
        if (!user || !user.refreshToken)
          throw new BadRequestException('Access Denied');
        const refreshTokenMatches = await argon2.verify(
          user.refreshToken,
          refreshToken,
        );
        if (!refreshTokenMatches) throw new BadRequestException('Access Denied');
        const tokens = await this.getAllTokens(user.id, user.username);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
      }
}
