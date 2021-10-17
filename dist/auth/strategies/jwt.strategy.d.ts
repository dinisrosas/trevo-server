import { Strategy } from "passport-jwt";
import { AuthUser } from "src/types";
declare type JwtPayload = {
    username: string;
    sub: string;
    iat: number;
    exp: number;
};
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): AuthUser;
}
export {};
