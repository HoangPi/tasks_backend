import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @Get('')
  @UseGuards(JwtAuthGuard)
  getUser(@Request() req){
    return req.user
  }
}
