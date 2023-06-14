import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users.service';
import { comparePasswords, encodePassword } from '../../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../users/entities/user.entity';
import { Payload } from '../../utils/jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(name: string, email: string, password: string) {
    const userResultByEmail = await this.usersService.findByEmail(email);

    if (userResultByEmail) {
      throw new HttpException('Email already taken', HttpStatus.BAD_REQUEST);
    }

    const userResultByName = await this.usersService.findByName(name);

    if (userResultByName) {
      throw new HttpException(
        'This attribute must be unique',
        HttpStatus.BAD_REQUEST,
      );
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
      throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
    }

    const comparePassword = await comparePasswords(
      password,
      userResult.password,
    );

    if (comparePassword) {
      let responseData = await this.generateJwt(userResult);
      responseData['name'] = userResult.name;

      return responseData;
    } else {
      throw new HttpException('Could Not Log In', HttpStatus.BAD_REQUEST);
    }
  }

  private async generateJwt(
    userResult: User,
  ): Promise<{ accessToken: string } | undefined> {
    const user: User = await this.usersService.findByEmail(userResult.email);
    const payload: Payload = { id: user.id, email: user.email };

    return { accessToken: await this.jwtService.sign(payload) };
  }
}
