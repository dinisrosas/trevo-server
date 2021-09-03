import { JwtService } from "@nestjs/jwt";
import { CreateUserInput } from "src/users/dto/create-user.input";
import { UsersService } from "src/users/users.service";
import { LoginInput } from "./dto/login.input";
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly saltOrRounds;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(loginInput: LoginInput): Promise<{
        token: string;
    }>;
    signUp(createUserInput: CreateUserInput): Promise<import(".prisma/client").User>;
}
