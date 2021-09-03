import { UserRole } from "@prisma/client";
export declare class User {
    id: number;
    name: string;
    username: string;
    password: string;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}
