import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { AuthSession } from './entities/auth-session.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthSession)
  async login(@Args('input') input: LoginInput): Promise<AuthSession> {
    return await this.authService.login(input);
  }

  @Mutation(() => User)
  signUp(@Args('input') input: CreateUserInput): Promise<User> {
    return this.authService.signUp(input);
  }
}
