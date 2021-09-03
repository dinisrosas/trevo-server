import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { CreateUserInput } from "src/users/dto/create-user.input";
import { UsersService } from "src/users/users.service";
import { LoginInput } from "./dto/login.input";

@Injectable()
export class AuthService {
  private readonly saltOrRounds = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginInput: LoginInput) {
    const { username, password } = loginInput;

    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async signUp(createUserInput: CreateUserInput) {
    const { password, ...rest } = createUserInput;

    const hash = await bcrypt.hash(password, this.saltOrRounds);

    const user = await this.usersService.create({
      ...rest,
      password: hash,
    });

    return user;
  }
}
