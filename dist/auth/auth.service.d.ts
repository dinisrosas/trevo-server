import { JwtService } from "@nestjs/jwt";
import { CreateUserInput } from "src/users/dto/create-user.input";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { LoginInput } from "./dto/login.input";
import { AuthSession } from "./entities/auth-session.entity";
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly rounds;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(loginInput: LoginInput): Promise<AuthSession>;
    signUp(createUserInput: CreateUserInput): Promise<User>;
    encryptPassword(password: string): Promise<string>;
    comparePasswords(password: string, encryptedPassword: string): Promise<boolean>;
}
