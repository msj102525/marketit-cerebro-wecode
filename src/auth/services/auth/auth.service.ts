import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users.service';
import { comparePasswords, encodePassword } from '../../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../users/entities/user.entity';
import { Payload } from '../../utils/jwtPayload';
import {
  Duplicate,
  DuplicateMessage,
} from 'src/common/exception/duplicate.exception';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(name: string, email: string, password: string) {
    if (await this.usersService.findByEmail(email)) {
      throw new Duplicate(DuplicateMessage.DUPLICATE_EMAIL);
    }

    if (await this.usersService.findByName(name)) {
      throw new Duplicate(DuplicateMessage.DUPLICATE_USER_NAME);
    }

    const hashedPassword: string = await encodePassword(password);

    return await this.usersService.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
  }

  async signIn(name: string, password: string) {
    const userResult = await this.usersService.findByName(name);

    if (!userResult) {
      throw new HttpException(
        'WRONG_USERNAME_OR_PASSWORD',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const comparePassword = await comparePasswords(
      password,
      userResult.password,
    );

    if (!comparePassword) {
      throw new HttpException(
        'WRONG_USERNAME_OR_PASSWORD',
        HttpStatus.UNAUTHORIZED,
      );
    }

    let responseData = await this.generateJwt(userResult);
    responseData['name'] = userResult.name;

    return responseData;
  }

  private async generateJwt(
    userResult: User,
  ): Promise<{ accessToken: string } | undefined> {
    const user: User = await this.usersService.findByEmail(userResult.email);
    const payload: Payload = { id: user.id, email: user.email };

    return { accessToken: await this.jwtService.sign(payload) };
  }
}
