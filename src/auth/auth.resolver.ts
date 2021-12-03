import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
}
