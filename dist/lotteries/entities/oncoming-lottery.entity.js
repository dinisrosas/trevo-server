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
exports.OncomingLottery = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
let OncomingLottery = class OncomingLottery {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, name: { type: () => String }, type: { type: () => Object }, mode: { type: () => Object }, isoDate: { type: () => String }, date: { type: () => Date } };
    }
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], OncomingLottery.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], OncomingLottery.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], OncomingLottery.prototype, "type", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], OncomingLottery.prototype, "mode", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], OncomingLottery.prototype, "isoDate", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Date)
], OncomingLottery.prototype, "date", void 0);
OncomingLottery = __decorate([
    graphql_1.ObjectType()
], OncomingLottery);
exports.OncomingLottery = OncomingLottery;
//# sourceMappingURL=oncoming-lottery.entity.js.map