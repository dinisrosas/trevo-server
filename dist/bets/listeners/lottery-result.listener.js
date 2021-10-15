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
var LotteryResultListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotteryResultListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const bets_service_1 = require("../bets.service");
const award_helper_1 = require("../helpers/award.helper");
let LotteryResultListener = LotteryResultListener_1 = class LotteryResultListener {
    constructor(betsService) {
        this.betsService = betsService;
        this.logger = new common_1.Logger(LotteryResultListener_1.name);
    }
    async handleLotteryResultUpdated(payload) {
        const bets = await this.betsService.findAllByLotteryId(payload.id);
        for (const bet of bets) {
            const award = award_helper_1.getBetAward({
                pick: bet.pick,
                result: payload.result,
                mode: payload.mode,
                target: bet.target,
                type: payload.type,
                ball: bet.ball,
                amount: bet.amount,
                updown: bet.updown,
            });
            await this.betsService.update(bet.id, { id: bet.id, award });
        }
    }
};
__decorate([
    event_emitter_1.OnEvent("lottery.result.updated"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LotteryResultListener.prototype, "handleLotteryResultUpdated", null);
LotteryResultListener = LotteryResultListener_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [bets_service_1.BetsService])
], LotteryResultListener);
exports.LotteryResultListener = LotteryResultListener;
//# sourceMappingURL=lottery-result.listener.js.map