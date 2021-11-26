"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const create_user_input_1 = require("../users/dto/create-user.input");
const user_entity_1 = require("../users/entities/user.entity");
const users_service_1 = require("../users/users.service");
const misc_1 = require("../utils/misc");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async login(loginInput) {
        const { username, password } = loginInput;
        const user = await this.usersService.findOneByUsername(username);
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const isMatch = await misc_1.comparePasswords(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const payload = {
            sub: user.id,
            username: user.username,
        };
        return {
            token: this.jwtService.sign(payload),
        };
    }
    async signUp(createUserInput) {
        const { password } = createUserInput, restOfProps = __rest(createUserInput, ["password"]);
        const encryptedPassword = await misc_1.encryptPassword(password);
        const user = await this.usersService.create(Object.assign(Object.assign({}, restOfProps), { password: encryptedPassword }));
        return user;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map