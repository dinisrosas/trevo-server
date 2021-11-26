import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    me(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findByUsername(username: string): Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): Promise<User>;
    updatePassword(user: User, currentPassword: string, newPassword: string): Promise<User>;
    removeUser(id: string): Promise<User>;
}
