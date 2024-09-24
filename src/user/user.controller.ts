import { Controller, Get, UseGuards, Request, HttpCode, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { FindUserDto } from './dto/find-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @Get('')
  @UseGuards(JwtAuthGuard)
  getUser(@Request() req){
    return req.user
  }

  @Post('/find')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  findUserWithSimilarUsername(@Body() body: FindUserDto){
    return this.userService.findUser(body.username, body.exclude)
  }
}
