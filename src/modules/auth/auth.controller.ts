import { Controller, Get, Post, Body, UsePipes, UseGuards } from '@nestjs/common';


import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto';
import {  AuthDecorator, getUser } from './decorators';
import { Auth } from './entities/auth.entity';




@Controller('auth')
@UsePipes()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  registerAuth(@Body() createDtoAuth: CreateAuthDto){
    return this.authService.create(createDtoAuth)
  }

  @Post('login')
  loginAuth(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto)
  }

  @Get('check-status')
  @AuthDecorator('user')
  checkAuth(@getUser() auth: Auth){
    return this.authService.checkAuthStatus(auth)
  }
}
