import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { comparePasswords, encryptPassword } from 'src/utils/misc';
import { LoginInput } from './dto/login.input';
import { AuthSession } from './entities/auth-session.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput): Promise<AuthSession> {
    const { username, password } = loginInput;

    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async signUp(input: CreateUserInput): Promise<User> {
    const { name, username, password } = input;

    const user = await this.usersService.findOneByUsername(username);

    if (user) {
      throw new BadRequestException('Username already exists');
    }

    const encryptedPassword = await encryptPassword(password);

    return await this.usersService.create({
      name,
      username,
      password: encryptedPassword,
    });
  }
}
