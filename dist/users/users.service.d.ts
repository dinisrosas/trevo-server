import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    findByUsername(username: string): Promise<User>;
    update(id: number, updateUserInput: UpdateUserInput): string;
    remove(id: number): Promise<User>;
}
