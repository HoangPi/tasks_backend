import { Body, Controller, Get, Post, UseGuards, Request, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UserService } from './user/user.service';
import { LocalAuthGuard } from './auth/strategy/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('signup')
  @HttpCode(201)
  signup(@Body() body: CreateUserDto){
    return this.userService.createOne(body)
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  login(@Request() req){
    return req.user
  }

  @Post('refresh')
  @HttpCode(200)
  refresh(@Body() body){
    try{
      return this.authService.RefreshUser(body.refresh)
    }
    catch(err){
      return err
    }
  }
}
