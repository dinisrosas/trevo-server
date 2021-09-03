import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    me(user: User): Promise<import(".prisma/client").User>;
    findAll(): Promise<import(".prisma/client").User[]>;
    findByUsername(username: string): Promise<import(".prisma/client").User>;
    updateUser(updateUserInput: UpdateUserInput): string;
    removeUser(id: number): Promise<import(".prisma/client").User>;
}
