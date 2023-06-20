import { statusMessage } from './../../../common/response/status.message.enum';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { CreateUserDto } from '../../../users/dtos/create.user.dto';
import { LoginUserDto } from '../../dtos/login.user.dto';
import { ApiResponse } from '../../../common/response/api.response';
import { SerializedUser } from '../../../common/serializers/serialized.user';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: CreateUserDto) {
    const name: string = body.name;
    const email: string = body.email;
    const password: string = body.password;

    const result = await this.authService.signUp(name, email, password);
    const user = new SerializedUser(result);

    return new ApiResponse(statusMessage.s, HttpStatus.CREATED, user);
  }

  @Post('sign-in')
  async signIn(@Body() body: LoginUserDto) {
    const name = body.name;
    const password = body.password;

    const result = await this.authService.signIn(name, password);

    return new ApiResponse(statusMessage.s, HttpStatus.OK, result);
  }
}
