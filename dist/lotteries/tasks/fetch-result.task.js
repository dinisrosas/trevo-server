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
exports.FetchLotteryResultTask = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const result_helper_1 = require("../helpers/result.helper");
const lotteries_service_1 = require("../lotteries.service");
let FetchLotteryResultTask = class FetchLotteryResultTask {
    constructor(lotteriesService) {
        this.lotteriesService = lotteriesService;
    }
    async fetchAndUpdateLotteryResult() {
        const activeLotteries = await this.lotteriesService.findRecentActiveLotteries();
        for (const lottery of activeLotteries) {
            const { result, isoDate } = await result_helper_1.getLatestLotteryResult(lottery.type);
            if (lottery.isoDate !== isoDate) {
                throw new common_1.NotAcceptableException("The date of the lottery and the date of the result fetched do not match");
            }
            await this.lotteriesService.updateResult(lottery.id, result);
        }
    }
};
__decorate([
    schedule_1.Cron("0 22 * * 1-3,5,6"),
    schedule_1.Cron("30 14 * * 4"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FetchLotteryResultTask.prototype, "fetchAndUpdateLotteryResult", null);
FetchLotteryResultTask = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [lotteries_service_1.LotteriesService])
], FetchLotteryResultTask);
exports.FetchLotteryResultTask = FetchLotteryResultTask;
//# sourceMappingURL=fetch-result.task.js.map