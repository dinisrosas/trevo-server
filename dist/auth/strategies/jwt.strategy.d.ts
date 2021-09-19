import { Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
declare type JwtPayload = {
    username: string;
    sub: string;
};
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(payload: JwtPayload): {
        id: string;
        username: string;
    };
}
export {};
