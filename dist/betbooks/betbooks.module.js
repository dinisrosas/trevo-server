"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetbooksModule = void 0;
const common_1 = require("@nestjs/common");
const betbooks_service_1 = require("./betbooks.service");
const betbooks_resolver_1 = require("./betbooks.resolver");
const prisma_service_1 = require("../prisma/prisma.service");
const games_module_1 = require("../games/games.module");
const bets_module_1 = require("../bets/bets.module");
let BetbooksModule = class BetbooksModule {
};
BetbooksModule = __decorate([
    (0, common_1.Module)({
        imports: [bets_module_1.BetsModule, games_module_1.GamesModule],
        providers: [betbooks_resolver_1.BetbooksResolver, betbooks_service_1.BetbooksService, prisma_service_1.PrismaService],
    })
], BetbooksModule);
exports.BetbooksModule = BetbooksModule;
//# sourceMappingURL=betbooks.module.js.map