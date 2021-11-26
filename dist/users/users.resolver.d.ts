import { UpdatePasswordInput, UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    me(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findByUsername(username: string): Promise<User>;
    updateUser(input: UpdateUserInput): Promise<User>;
    updatePassword(user: User, input: UpdatePasswordInput): Promise<User>;
    deleteUser(id: string): Promise<User>;
}
