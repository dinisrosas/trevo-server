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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotteriesResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const types_1 = require("../types");
const create_lottery_input_1 = require("./dto/create-lottery.input");
const update_lottery_input_1 = require("./dto/update-lottery.input");
const lottery_result_entity_1 = require("./entities/lottery-result.entity");
const lottery_entity_1 = require("./entities/lottery.entity");
const oncoming_lottery_entity_1 = require("./entities/oncoming-lottery.entity");
const result_helper_1 = require("./helpers/result.helper");
const lotteries_service_1 = require("./lotteries.service");
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
        return this.lotteriesService.findFinished(user.id);
    }
    findOneByTypeIsoDate(type, isoDate) {
        return this.lotteriesService.findOneByTypeIsoDate(type, isoDate);
    }
    async findLastestResultByType(type) {
        return await result_helper_1.getLatestLotteryResult(type);
    }
    updateLottery(updateLotteryInput) {
        return this.lotteriesService.update(updateLotteryInput.id, updateLotteryInput);
    }
    removeLottery(id) {
        return this.lotteriesService.remove(id);
    }
};
__decorate([
    graphql_1.Mutation(() => lottery_entity_1.Lottery),
    __param(0, graphql_1.Args("createLotteryInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lottery_input_1.CreateLotteryInput]),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "createLottery", null);
__decorate([
    graphql_1.Query(() => [lottery_entity_1.Lottery], { name: "lotteries" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => [oncoming_lottery_entity_1.OncomingLottery], { name: "oncomingLotteries" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], LotteriesResolver.prototype, "findOncomingLotteries", null);
__decorate([
    graphql_1.Query(() => [lottery_entity_1.Lottery], { name: "finishedLotteries" }),
    __param(0, current_user_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "findFinished", null);
__decorate([
    graphql_1.Query(() => lottery_entity_1.Lottery, { name: "lottery" }),
    __param(0, graphql_1.Args("type")),
    __param(1, graphql_1.Args("isoDate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "findOneByTypeIsoDate", null);
__decorate([
    graphql_1.Query(() => lottery_result_entity_1.LotteryResult, { name: "latestLotteryResult" }),
    __param(0, graphql_1.Args("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "findLastestResultByType", null);
__decorate([
    graphql_1.Mutation(() => lottery_entity_1.Lottery),
    __param(0, graphql_1.Args("updateLotteryInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_lottery_input_1.UpdateLotteryInput]),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "updateLottery", null);
__decorate([
    graphql_1.Mutation(() => lottery_entity_1.Lottery),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotteriesResolver.prototype, "removeLottery", null);
LotteriesResolver = __decorate([
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    graphql_1.Resolver(() => lottery_entity_1.Lottery),
    __metadata("design:paramtypes", [lotteries_service_1.LotteriesService])
], LotteriesResolver);
exports.LotteriesResolver = LotteriesResolver;
//# sourceMappingURL=lotteries.resolver.js.map