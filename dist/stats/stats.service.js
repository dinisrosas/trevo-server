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
exports.LotteriesService = void 0;
const common_1 = require("@nestjs/common");
const eventemitter2_1 = require("eventemitter2");
const luxon_1 = require("luxon");
const prisma_service_1 = require("../prisma/prisma.service");
const types_1 = require("../types");
const raw_lotteries_1 = require("./data/raw-lotteries");
const oncoming_helper_1 = require("./helpers/oncoming.helper");
let LotteriesService = class LotteriesService {
    constructor(prisma, eventEmitter) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
        this.rawLotteries = raw_lotteries_1.default;
    }
    async create(createLotteryInput) {
        const { type, isoDate } = createLotteryInput;
        const rawLottery = this.rawLotteries.find((lottery) => lottery.type === type);
        const date = luxon_1.DateTime.fromISO(isoDate)
            .startOf("day")
            .set(Object.assign({}, rawLottery.time));
        const lotteryMode = /(EM|TL)/.test(type) ? "DRAW" : "LOTTERY";
        return await this.prisma.lottery.create({
            data: {
                type,
                name: rawLottery.name,
                mode: lotteryMode,
                date: date.toJSDate(),
                isoDate: date.toISODate(),
            },
        });
    }
    async findOrCreate(createLotteryInput) {
        const { type, isoDate } = createLotteryInput;
        const lottery = await this.findOneByTypeIsoDate(type, isoDate);
        if (lottery) {
            return lottery;
        }
        return await this.create(createLotteryInput);
    }
    async findAll() {
        return await this.prisma.lottery.findMany();
    }
    async findOneById(id) {
        return await this.prisma.lottery.findUnique({
            where: { id },
            include: {
                bets: {
                    include: {
                        betbook: true,
                    },
                },
            },
        });
    }
    async findAllFinished(sellerId) {
        return await this.prisma.lottery.findMany({
            where: {
                result: {
                    not: null,
                },
                bets: {
                    every: {
                        betbook: {
                            sellerId,
                        },
                    },
                },
            },
            orderBy: {
                id: "desc",
            },
        });
    }
    async findOneByTypeIsoDate(type, isoDate) {
        return await this.prisma.lottery.findUnique({
            where: {
                type_iso_date: { isoDate, type },
            },
        });
    }
    findOncoming() {
        return oncoming_helper_1.getNextLotteries();
    }
    async findRecentActiveLotteries() {
        const today = luxon_1.DateTime.now().toISODate();
        return await this.prisma.lottery.findMany({
            where: {
                isoDate: today,
                result: null,
            },
        });
    }
    async update(id, updateLotteryInput) {
        const lottery = await this.prisma.lottery.update({
            where: {
                id,
            },
            data: Object.assign({}, updateLotteryInput),
        });
        return lottery;
    }
    async updateResult(id, result) {
        const lottery = await this.prisma.lottery.update({
            where: {
                id,
            },
            data: {
                result,
            },
        });
        this.eventEmitter.emit("lottery.result.updated", lottery);
        return lottery;
    }
    async remove(id) {
        return await this.prisma.lottery.delete({ where: { id } });
    }
};
LotteriesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        eventemitter2_1.EventEmitter2])
], LotteriesService);
exports.LotteriesService = LotteriesService;
//# sourceMappingURL=stats.service.js.map