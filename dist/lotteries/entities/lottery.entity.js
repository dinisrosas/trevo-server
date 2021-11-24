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
exports.LotteryConnection = exports.LotteryEdge = exports.Lottery = void 0;
const eager_import_0 = require("../../bets/entities/bet.entity");
const eager_import_1 = require("./lottery.entity");
const eager_import_2 = require("../../common/entities/pagination.entity");
const graphql_1 = require("@nestjs/graphql");
const bet_entity_1 = require("../../bets/entities/bet.entity");
const pagination_entity_1 = require("../../common/entities/pagination.entity");
const types_1 = require("../../types");
graphql_1.registerEnumType(types_1.LotteryModeEnum, {
    name: "LotteryMode",
});
graphql_1.registerEnumType(types_1.LotteryTypeEnum, {
    name: "LotteryType",
});
let Lottery = class Lottery {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, sid: { type: () => Number }, name: { type: () => String }, type: { type: () => Object }, mode: { type: () => Object }, isoDate: { type: () => String }, bets: { nullable: true, type: () => [require("../../bets/entities/bet.entity").Bet] }, date: { type: () => Date }, result: { nullable: true, type: () => String }, createdAt: { type: () => Date }, updatedAt: { type: () => Date } };
    }
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], Lottery.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Number)
], Lottery.prototype, "sid", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Lottery.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => types_1.LotteryTypeEnum),
    __metadata("design:type", String)
], Lottery.prototype, "type", void 0);
__decorate([
    graphql_1.Field(() => types_1.LotteryModeEnum),
    __metadata("design:type", String)
], Lottery.prototype, "mode", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Lottery.prototype, "isoDate", void 0);
__decorate([
    graphql_1.Field(() => [bet_entity_1.Bet]),
    __metadata("design:type", Array)
], Lottery.prototype, "bets", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Date)
], Lottery.prototype, "date", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Lottery.prototype, "result", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Date)
], Lottery.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Date)
], Lottery.prototype, "updatedAt", void 0);
Lottery = __decorate([
    graphql_1.ObjectType()
], Lottery);
exports.Lottery = Lottery;
let LotteryEdge = class LotteryEdge {
    static _GRAPHQL_METADATA_FACTORY() {
        return { cursor: { type: () => String }, node: { type: () => require("./lottery.entity").Lottery } };
    }
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], LotteryEdge.prototype, "cursor", void 0);
__decorate([
    graphql_1.Field(() => Lottery),
    __metadata("design:type", Lottery)
], LotteryEdge.prototype, "node", void 0);
LotteryEdge = __decorate([
    graphql_1.ObjectType()
], LotteryEdge);
exports.LotteryEdge = LotteryEdge;
let LotteryConnection = class LotteryConnection {
    static _GRAPHQL_METADATA_FACTORY() {
        return { edges: { type: () => [require("./lottery.entity").LotteryEdge] }, pageInfo: { type: () => require("../../common/entities/pagination.entity").PageInfo }, totalCount: { type: () => Number } };
    }
};
__decorate([
    graphql_1.Field(() => [LotteryEdge]),
    __metadata("design:type", Array)
], LotteryConnection.prototype, "edges", void 0);
__decorate([
    graphql_1.Field(() => pagination_entity_1.PageInfo),
    __metadata("design:type", pagination_entity_1.PageInfo)
], LotteryConnection.prototype, "pageInfo", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], LotteryConnection.prototype, "totalCount", void 0);
LotteryConnection = __decorate([
    graphql_1.ObjectType()
], LotteryConnection);
exports.LotteryConnection = LotteryConnection;
//# sourceMappingURL=lottery.entity.js.map