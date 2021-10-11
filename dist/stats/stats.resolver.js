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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotteriesResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
let LotteriesResolver = class LotteriesResolver {
    constructor(lotteriesService) {
        this.lotteriesService = lotteriesService;
    }
    createLottery(createLotteryInput) {
        return this.lotteriesService.create(createLotteryInput);
    }
    findAll() {
        return this.lotteriesService.findAll();
    }
    findOncomingLotteries() {
        return this.lotteriesService.findOncoming();
    }
    findFinished(user) {
        return this.lotteriesService.findAllFinished(user.id);
    }
    findOne(id) {
        return this.lotteriesService.findOneById(id);
    }
    async findLastestResultByType(type) {
        return await getLatestLotteryResult(type);
    }
    updateLottery(updateLotteryInput) {
        return this.lotteriesService.update(updateLotteryInput.id, updateLotteryInput);
    }
    removeLottery(id) {
        return this.lotteriesService.remove(id);
    }
};
__decorate([
    graphql_1.Mutation(() => Lottery),
    __param(0, graphql_1.Args("createLotteryInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof CreateLotteryInput !== "undefined" && CreateLotteryInput) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "createLottery", null);
__decorate([
    graphql_1.Query(() => [Lottery], { name: "lotteries" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => [OncomingLottery], { name: "oncomingLotteries" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], LotteriesResolver.prototype, "findOncomingLotteries", null);
__decorate([
    graphql_1.Query(() => [Lottery], { name: "finishedLotteries" }),
    __param(0, current_user_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof AuthUser !== "undefined" && AuthUser) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "findFinished", null);
__decorate([
    graphql_1.Query(() => Lottery, { name: "lottery" }),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "findOne", null);
__decorate([
    graphql_1.Query(() => LotteryResult, { name: "latestLotteryResult" }),
    __param(0, graphql_1.Args("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof LotteryType !== "undefined" && LotteryType) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "findLastestResultByType", null);
__decorate([
    graphql_1.Mutation(() => Lottery),
    __param(0, graphql_1.Args("updateLotteryInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof UpdateLotteryInput !== "undefined" && UpdateLotteryInput) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "updateLottery", null);
__decorate([
    graphql_1.Mutation(() => Lottery),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "removeLottery", null);
LotteriesResolver = __decorate([
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    graphql_1.Resolver(() => Lottery),
    __metadata("design:paramtypes", [typeof (_e = typeof LotteriesService !== "undefined" && LotteriesService) === "function" ? _e : Object])
], LotteriesResolver);
exports.LotteriesResolver = LotteriesResolver;
//# sourceMappingURL=stats.resolver.js.map