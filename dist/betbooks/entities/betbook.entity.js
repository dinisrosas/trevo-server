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
exports.BetbookConnection = exports.Betbook = void 0;
const graphql_1 = require("@nestjs/graphql");
const bet_entity_1 = require("../../bets/entities/bet.entity");
const pagination_entity_1 = require("../../common/generics/pagination.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Betbook = class Betbook {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Betbook.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Betbook.prototype, "sid", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Betbook.prototype, "bettor", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], Betbook.prototype, "fixed", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", user_entity_1.User)
], Betbook.prototype, "seller", void 0);
__decorate([
    (0, graphql_1.Field)(() => [bet_entity_1.Bet]),
    __metadata("design:type", Array)
], Betbook.prototype, "bets", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Betbook.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Betbook.prototype, "createdAt", void 0);
Betbook = __decorate([
    (0, graphql_1.ObjectType)()
], Betbook);
exports.Betbook = Betbook;
let BetbookConnection = class BetbookConnection extends (0, pagination_entity_1.Connection)(Betbook) {
};
BetbookConnection = __decorate([
    (0, graphql_1.ObjectType)()
], BetbookConnection);
exports.BetbookConnection = BetbookConnection;
//# sourceMappingURL=betbook.entity.js.map