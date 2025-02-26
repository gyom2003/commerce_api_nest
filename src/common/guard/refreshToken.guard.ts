import { Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class RefreshTokenGuardClass extends AuthGuard('jwt-refresh') {}