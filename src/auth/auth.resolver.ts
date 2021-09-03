import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { AuthSession } from "./entities/auth-session.entity";
import { CreateUserInput } from "src/users/dto/create-user.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthSession)
  login(@Args("loginInput") loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => User)
  signUp(@Args("signUpInput") createUserInput: CreateUserInput) {
    return this.authService.signUp(createUserInput);
  }
}
