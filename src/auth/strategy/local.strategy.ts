import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseMessages } from 'src/constants/responseMessage';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    @Inject("RefreshService")
    private refreshService: JwtService
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {

      const user = await this.authService.ValidateUser(username, password);
      if (!user) {
        throw UnauthorizedException;
      }
      return {
        user,
        access: this.jwtService.sign(user),
        refresh: this.refreshService.sign(user)
      }
    }
    catch (err) {
      throw new UnauthorizedException({message: ResponseMessages.USER_NOT_FOUND})
    }
  }
}