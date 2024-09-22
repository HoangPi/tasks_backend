import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { RefreshModule } from './jwt.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: {
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE
      }
    }),
    RefreshModule
  ],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
