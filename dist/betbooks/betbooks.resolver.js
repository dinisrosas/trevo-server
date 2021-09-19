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
exports.BetbooksResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const types_1 = require("../types");
const betbooks_service_1 = require("./betbooks.service");
const create_betbook_input_1 = require("./dto/create-betbook.input");
const update_betbook_input_1 = require("./dto/update-betbook.input");
const betbook_entity_1 = require("./entities/betbook.entity");
let BetbooksResolver = class BetbooksResolver {
    constructor(betbooksService) {
        this.betbooksService = betbooksService;
    }
    createBetbook(user, createBetbookInput) {
        return this.betbooksService.create(Object.assign(Object.assign({}, createBetbookInput), { sellerId: user.id }));
    }
    findAll(user) {
        return this.betbooksService.findAllBySeller(user.id);
    }
    findOne(id) {
        return this.betbooksService.findOne(id);
    }
    updateBetbook(updateBetbookInput) {
        return this.betbooksService.update(updateBetbookInput.id, updateBetbookInput);
    }
    removeBetbook(id) {
        return this.betbooksService.remove(id);
    }
};
__decorate([
    graphql_1.Mutation(() => betbook_entity_1.Betbook),
    __param(0, current_user_decorator_1.CurrentUser()),
    __param(1, graphql_1.Args("createBetbookInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_betbook_input_1.CreateBetbookInput]),
    __metadata("design:returntype", Promise)
], BetbooksResolver.prototype, "createBetbook", null);
__decorate([
    graphql_1.Query(() => [betbook_entity_1.Betbook], { name: "betbooks" }),
    __param(0, current_user_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BetbooksResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => betbook_entity_1.Betbook, { name: "betbook" }),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BetbooksResolver.prototype, "findOne", null);
__decorate([
    graphql_1.Mutation(() => betbook_entity_1.Betbook),
    __param(0, graphql_1.Args("updateBetbookInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_betbook_input_1.UpdateBetbookInput]),
    __metadata("design:returntype", Promise)
], BetbooksResolver.prototype, "updateBetbook", null);
__decorate([
    graphql_1.Mutation(() => betbook_entity_1.Betbook),
    __param(0, graphql_1.Args("id", { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BetbooksResolver.prototype, "removeBetbook", null);
BetbooksResolver = __decorate([
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    graphql_1.Resolver(() => betbook_entity_1.Betbook),
    __metadata("design:paramtypes", [betbooks_service_1.BetbooksService])
], BetbooksResolver);
exports.BetbooksResolver = BetbooksResolver;
//# sourceMappingURL=betbooks.resolver.js.map