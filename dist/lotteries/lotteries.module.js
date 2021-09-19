"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotteriesModule = void 0;
const common_1 = require("@nestjs/common");
const lotteries_service_1 = require("./lotteries.service");
const lotteries_resolver_1 = require("./lotteries.resolver");
const prisma_service_1 = require("../prisma/prisma.service");
const fetch_result_task_1 = require("./tasks/fetch-result.task");
let LotteriesModule = class LotteriesModule {
};
LotteriesModule = __decorate([
    common_1.Module({
        providers: [
            lotteries_resolver_1.LotteriesResolver,
            lotteries_service_1.LotteriesService,
            prisma_service_1.PrismaService,
            fetch_result_task_1.FetchLotteryResultTask,
        ],
        exports: [lotteries_service_1.LotteriesService],
    })
], LotteriesModule);
exports.LotteriesModule = LotteriesModule;
//# sourceMappingURL=lotteries.module.js.map