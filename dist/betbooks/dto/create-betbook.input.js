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
exports.CreateBetbookInput = void 0;
const eager_import_0 = require("../../bets/dto/create-bet.input");
const graphql_1 = require("@nestjs/graphql");
const create_bet_input_1 = require("../../bets/dto/create-bet.input");
let CreateBetbookInput = class CreateBetbookInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { bettor: { type: () => String }, fixed: { type: () => Boolean }, bets: { type: () => [require("../../bets/dto/create-bet.input").CreateBetInput] } };
    }
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateBetbookInput.prototype, "bettor", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Boolean)
], CreateBetbookInput.prototype, "fixed", void 0);
__decorate([
    graphql_1.Field(() => [create_bet_input_1.CreateBetInput]),
    __metadata("design:type", Array)
], CreateBetbookInput.prototype, "bets", void 0);
CreateBetbookInput = __decorate([
    graphql_1.InputType()
], CreateBetbookInput);
exports.CreateBetbookInput = CreateBetbookInput;
//# sourceMappingURL=create-betbook.input.js.map