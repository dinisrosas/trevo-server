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
exports.BetbooksService = void 0;
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
const common_1 = require("@nestjs/common");
const luxon_1 = require("luxon");
const bets_service_1 = require("../bets/bets.service");
const lotteries_service_1 = require("../lotteries/lotteries.service");
const prisma_service_1 = require("../prisma/prisma.service");
const misc_1 = require("../utils/misc");
let BetbooksService = class BetbooksService {
    constructor(prisma, betsService, lotteriesService) {
        this.prisma = prisma;
        this.betsService = betsService;
        this.lotteriesService = lotteriesService;
    }
    async create(createBetbookInput) {
        const now = luxon_1.DateTime.now();
        const hasInvalidDate = createBetbookInput.bets.some((bet) => {
            const lottery = misc_1.getLottery(bet.lottery.type, bet.lottery.isoDate);
            if (!lottery) {
                return true;
            }
            return lottery.date.diff(now).as("minutes") < 50;
        });
        if (hasInvalidDate) {
            throw new common_1.BadRequestException("Less than 50 minutes left for one or more selected lotteries");
        }
        const betbook = await this.prisma.betbook.create({
            data: {
                bettor: createBetbookInput.bettor,
                fixed: createBetbookInput.fixed,
                sellerId: createBetbookInput.sellerId,
            },
        });
        for (const bet of createBetbookInput.bets) {
            const lottery = await this.lotteriesService.findOrCreate({
                isoDate: bet.lottery.isoDate,
                type: bet.lottery.type,
            });
            await this.betsService.create({
                betbookId: betbook.id,
                lotteryId: lottery.id,
                pick: bet.pick,
                target: bet.target,
                updown: bet.updown,
                ball: bet.ball,
            });
        }
        return betbook;
    }
    async findAllBySeller(sellerId, fixed, after, first) {
        const args = {
            where: {
                sellerId,
                fixed,
            },
            orderBy: {
                id: "desc",
            },
            include: {
                seller: true,
                bets: {
                    include: {
                        lottery: true,
                    },
                },
            },
        };
        const betbooks = await prisma_relay_cursor_connection_1.findManyCursorConnection((pagination) => this.prisma.betbook.findMany(Object.assign(Object.assign({}, pagination), args)), () => this.prisma.betbook.count({ where: args.where }), { first, after });
        return betbooks;
    }
    async findOne(id) {
        return await this.prisma.betbook.findUnique({
            where: { id },
            include: {
                seller: true,
                bets: {
                    include: {
                        lottery: true,
                    },
                },
            },
        });
    }
    async update(id, updateBetbookInput) {
        return await this.prisma.betbook.update({
            where: { id },
            data: Object.assign({}, updateBetbookInput),
        });
    }
    async delete(id) {
        const betbook = await this.prisma.betbook.findUnique({ where: { id } });
        if (!betbook) {
            throw new Error("Betbook not found");
        }
        await this.prisma.$queryRaw("DELETE FROM betbooks WHERE id = $1", id);
        return betbook;
    }
};
BetbooksService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bets_service_1.BetsService,
        lotteries_service_1.LotteriesService])
], BetbooksService);
exports.BetbooksService = BetbooksService;
//# sourceMappingURL=betbooks.service.js.map