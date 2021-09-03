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
const luxon_1 = require("luxon");
const prisma_service_1 = require("../prisma/prisma.service");
const raw_lotteries_1 = require("./data/raw-lotteries");
let LotteriesService = class LotteriesService {
    constructor(prisma) {
        this.prisma = prisma;
        this.lotteries = raw_lotteries_1.default;
    }
    create(createLotteryInput) {
        const { type, iso_date } = createLotteryInput;
        const lottery = this.lotteries.find((lottery) => lottery.type === type);
        const date = luxon_1.DateTime.fromISO(iso_date)
            .startOf("day")
            .set(Object.assign({}, lottery.time))
            .toJSDate();
        return this.prisma.lottery.create({
            data: {
                type,
                date,
                iso_date,
                name: lottery.name,
            },
        });
    }
    findAll() {
        return this.prisma.lottery.findMany();
    }
    findOne(id) {
        return `This action returns a #${id} lottery`;
    }
    update(id, updateLotteryInput) {
        return `This action updates a #${id} lottery`;
    }
    remove(id) {
        return `This action removes a #${id} lottery`;
    }
};
LotteriesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LotteriesService);
exports.LotteriesService = LotteriesService;
//# sourceMappingURL=lotteries.service.js.map