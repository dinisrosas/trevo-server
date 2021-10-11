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
exports.BetsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const bets_service_1 = require("./bets.service");
const update_bet_input_1 = require("./dto/update-bet.input");
const bet_entity_1 = require("./entities/bet.entity");
let BetsResolver = class BetsResolver {
    constructor(betsService) {
        this.betsService = betsService;
    }
    findAll() {
        return this.betsService.findAll();
    }
    findOne(id) {
        return this.betsService.findOne(id);
    }
    updateBet(updateBetInput) {
        return this.betsService.update(updateBetInput.id, updateBetInput);
    }
    removeBet(id) {
        return this.betsService.remove(id);
    }
};
__decorate([
    graphql_1.Query(() => [bet_entity_1.Bet], { name: "bets" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BetsResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => bet_entity_1.Bet, { name: "bet" }),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BetsResolver.prototype, "findOne", null);
__decorate([
    graphql_1.Mutation(() => bet_entity_1.Bet),
    __param(0, graphql_1.Args("updateBetInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_bet_input_1.UpdateBetInput]),
    __metadata("design:returntype", Promise)
], BetsResolver.prototype, "updateBet", null);
__decorate([
    graphql_1.Mutation(() => bet_entity_1.Bet),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BetsResolver.prototype, "removeBet", null);
BetsResolver = __decorate([
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    graphql_1.Resolver(() => bet_entity_1.Bet),
    __metadata("design:paramtypes", [bets_service_1.BetsService])
], BetsResolver);
exports.BetsResolver = BetsResolver;
//# sourceMappingURL=bets.resolver.js.map