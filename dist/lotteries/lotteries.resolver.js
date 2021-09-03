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
const graphql_1 = require("@nestjs/graphql");
const lotteries_service_1 = require("./lotteries.service");
const lottery_entity_1 = require("./entities/lottery.entity");
const create_lottery_input_1 = require("./dto/create-lottery.input");
const update_lottery_input_1 = require("./dto/update-lottery.input");
const common_1 = require("@nestjs/common");
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
    findOne(id) {
        return this.lotteriesService.findOne(id);
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
    __metadata("design:returntype", void 0)
], LotteriesResolver.prototype, "createLottery", null);
__decorate([
    graphql_1.Query(() => [lottery_entity_1.Lottery], { name: "lotteries" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LotteriesResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => lottery_entity_1.Lottery, { name: "lottery" }),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LotteriesResolver.prototype, "findOne", null);
__decorate([
    graphql_1.Mutation(() => lottery_entity_1.Lottery),
    __param(0, graphql_1.Args("updateLotteryInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_lottery_input_1.UpdateLotteryInput]),
    __metadata("design:returntype", void 0)
], LotteriesResolver.prototype, "updateLottery", null);
__decorate([
    graphql_1.Mutation(() => lottery_entity_1.Lottery),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LotteriesResolver.prototype, "removeLottery", null);
LotteriesResolver = __decorate([
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    graphql_1.Resolver(() => lottery_entity_1.Lottery),
    __metadata("design:paramtypes", [lotteries_service_1.LotteriesService])
], LotteriesResolver);
exports.LotteriesResolver = LotteriesResolver;
//# sourceMappingURL=lotteries.resolver.js.map