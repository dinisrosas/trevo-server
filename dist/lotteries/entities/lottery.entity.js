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
exports.Lottery = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
let Lottery = class Lottery {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, type: { type: () => Object }, iso_date: { type: () => String }, date: { type: () => Date }, created_at: { type: () => Date }, updated_at: { type: () => Date } };
    }
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", Number)
], Lottery.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Lottery.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Lottery.prototype, "type", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Lottery.prototype, "iso_date", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Date)
], Lottery.prototype, "date", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Date)
], Lottery.prototype, "created_at", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Date)
], Lottery.prototype, "updated_at", void 0);
Lottery = __decorate([
    graphql_1.ObjectType()
], Lottery);
exports.Lottery = Lottery;
//# sourceMappingURL=lottery.entity.js.map