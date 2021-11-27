"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetsModule = void 0;
const common_1 = require("@nestjs/common");
const games_module_1 = require("../games/games.module");
const prisma_service_1 = require("../prisma/prisma.service");
const bets_resolver_1 = require("./bets.resolver");
const bets_service_1 = require("./bets.service");
const game_result_listener_1 = require("./listeners/game-result.listener");
let BetsModule = class BetsModule {
};
BetsModule = __decorate([
    (0, common_1.Module)({
        imports: [games_module_1.GamesModule],
        providers: [bets_resolver_1.BetsResolver, bets_service_1.BetsService, prisma_service_1.PrismaService, game_result_listener_1.GameResultListener],
        exports: [bets_service_1.BetsService],
    })
], BetsModule);
exports.BetsModule = BetsModule;
//# sourceMappingURL=bets.module.js.map