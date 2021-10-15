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
exports.BetsService = void 0;
const common_1 = require("@nestjs/common");
const lotteries_service_1 = require("../lotteries/lotteries.service");
const prisma_service_1 = require("../prisma/prisma.service");
const amount_helper_1 = require("./helpers/amount.helper");
let BetsService = class BetsService {
    constructor(prisma, lotteriesService) {
        this.prisma = prisma;
        this.lotteriesService = lotteriesService;
    }
    async create(createBetInput) {
        const lottery = await this.lotteriesService.findOneById(createBetInput.lotteryId);
        const amount = amount_helper_1.getBetAmount({
            mode: lottery.mode,
            pick: createBetInput.pick,
            target: createBetInput.target,
            updown: createBetInput.updown,
        });
        return this.prisma.bet.create({
            data: {
                amount,
                target: createBetInput.target,
                pick: createBetInput.pick,
                updown: createBetInput.updown,
                ball: createBetInput.ball,
                betbookId: createBetInput.betbookId,
                lotteryId: createBetInput.lotteryId,
            },
        });
    }
    async findAll() {
        return await this.prisma.bet.findMany();
    }
    async findAllByLotteryId(lotteryId) {
        return await this.prisma.bet.findMany({
            where: {
                lotteryId: lotteryId,
            },
        });
    }
    async findAllByBetbookId(betbookId) {
        return await this.prisma.bet.findMany({
            where: {
                betbookId: betbookId,
            },
        });
    }
    async getBetbookTotalAmount(betbookId) {
        const aggregate = await this.prisma.bet.aggregate({
            where: {
                betbookId: betbookId,
            },
            _sum: {
                amount: true,
            },
        });
        return aggregate._sum.amount;
    }
    async findOne(id) {
        return await this.prisma.bet.findUnique({ where: { id } });
    }
    async update(id, updateBetInput) {
        return await this.prisma.bet.update({
            where: { id },
            data: Object.assign({}, updateBetInput),
        });
    }
    async remove(id) {
        return await this.prisma.bet.delete({ where: { id } });
    }
};
BetsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        lotteries_service_1.LotteriesService])
], BetsService);
exports.BetsService = BetsService;
//# sourceMappingURL=bets.service.js.map