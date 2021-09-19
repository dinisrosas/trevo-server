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
exports.Bet = void 0;
const eager_import_0 = require("../../lotteries/entities/lottery.entity");
const eager_import_1 = require("../../betbooks/entities/betbook.entity");
const graphql_1 = require("@nestjs/graphql");
const betbook_entity_1 = require("../../betbooks/entities/betbook.entity");
const lottery_entity_1 = require("../../lotteries/entities/lottery.entity");
let Bet = class Bet {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, sid: { type: () => Number }, target: { type: () => Number }, pick: { type: () => String }, amount: { type: () => Number }, award: { nullable: true, type: () => Number }, lottery: { nullable: true, type: () => require("../../lotteries/entities/lottery.entity").Lottery }, betbook: { nullable: true, type: () => require("../../betbooks/entities/betbook.entity").Betbook }, upDown: { nullable: true, type: () => Boolean }, updatedAt: { type: () => Date }, createdAt: { type: () => Date } };
    }
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], Bet.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Number)
], Bet.prototype, "sid", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Number)
], Bet.prototype, "target", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Bet.prototype, "pick", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Number)
], Bet.prototype, "amount", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], Bet.prototype, "award", void 0);
__decorate([
    graphql_1.Field(() => lottery_entity_1.Lottery),
    __metadata("design:type", lottery_entity_1.Lottery)
], Bet.prototype, "lottery", void 0);
__decorate([
    graphql_1.Field(() => betbook_entity_1.Betbook),
    __metadata("design:type", betbook_entity_1.Betbook)
], Bet.prototype, "betbook", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], Bet.prototype, "upDown", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Date)
], Bet.prototype, "updatedAt", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Date)
], Bet.prototype, "createdAt", void 0);
Bet = __decorate([
    graphql_1.ObjectType()
], Bet);
exports.Bet = Bet;
//# sourceMappingURL=bet.entity.js.map