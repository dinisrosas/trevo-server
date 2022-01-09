import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRoleEnum } from 'src/types';
import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/utils/misc';
import { LoginInput } from './dto/login.input';
import { AuthSession } from './entities/auth-session.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput, isAdmin?: boolean): Promise<AuthSession> {
    const { username, password } = loginInput;

    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (isAdmin && !user.roles.includes(UserRoleEnum.Admin)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
