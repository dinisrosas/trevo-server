import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdatePasswordInput, UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    findOneById(id: string): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    update(id: string, updateUserInput: UpdateUserInput): Promise<User>;
    updatePassword(id: string, data: UpdatePasswordInput): Promise<User>;
    remove(id: string): Promise<User>;
}
