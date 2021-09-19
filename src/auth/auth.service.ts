import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { CreateUserInput } from "src/users/dto/create-user.input";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { LoginInput } from "./dto/login.input";
import { AuthSession } from "./entities/auth-session.entity";

@Injectable()
export class AuthService {
  private readonly saltOrRounds = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginInput: LoginInput): Promise<AuthSession> {
    const { username, password } = loginInput;

    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isMatch = await this.comparePasswords(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async signUp(createUserInput: CreateUserInput): Promise<User> {
    const { password, ...restOfProps } = createUserInput;

    const encryptedPassword = await this.encryptPassword(password);

    const user = await this.usersService.create({
      ...restOfProps,
      password: encryptedPassword,
    });

    return user;
  }

  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltOrRounds);
  }

  async comparePasswords(
    password: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
