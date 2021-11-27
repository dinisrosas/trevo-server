import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { AuthSession } from './entities/auth-session.entity';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(input: LoginInput): Promise<AuthSession>;
    signUp(input: CreateUserInput): Promise<User>;
}
