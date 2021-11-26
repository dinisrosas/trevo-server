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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const misc_1 = require("../utils/misc");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createUserInput) {
        return this.prisma.user.create({
            data: createUserInput,
        });
    }
    findAll() {
        return this.prisma.user.findMany();
    }
    findOneById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    findOneByUsername(username) {
        return this.prisma.user.findUnique({ where: { username } });
    }
    async update(id, updateUserInput) {
        return this.prisma.user.update({
            where: { id },
            data: updateUserInput,
        });
    }
    async updatePassword(id, data) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        const match = await misc_1.comparePasswords(data.currentPassword, user.password);
        if (!match) {
            throw new common_1.BadRequestException("Current password does not match user password");
        }
        const hashedPassword = await misc_1.encryptPassword(data.newPassword);
        return this.prisma.user.update({
            where: { id },
            data: {
                password: hashedPassword,
            },
        });
    }
    remove(id) {
        return this.prisma.user.delete({ where: { id } });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map