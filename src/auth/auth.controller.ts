import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { User } from './entities';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
    ) {}

    @Post("register")
    registerUser(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto);
    }

    @Post("login")
    loginUser(@Body() loginUserDto: LoginUserDto) {
      return this.authService.login(loginUserDto);
    }

    @Get("test")
    @Auth(ValidRoles.admin)
    protectedRoute(@GetUser() user: User) {
      return {user};
    }
}
