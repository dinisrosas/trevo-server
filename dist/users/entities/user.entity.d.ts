import { UserRole } from '@prisma/client';
export declare class User {
    id: string;
    sid: number;
    name: string;
    username: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
