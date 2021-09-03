import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { CreateUserInput } from "src/users/dto/create-user.input";
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginInput: LoginInput): Promise<{
        token: string;
    }>;
    signUp(createUserInput: CreateUserInput): Promise<import(".prisma/client").User>;
}
