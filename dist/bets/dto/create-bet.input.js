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
exports.CreateBetInput = void 0;
const eager_import_0 = require("../../lotteries/dto/create-lottery.input");
const graphql_1 = require("@nestjs/graphql");
const create_lottery_input_1 = require("../../lotteries/dto/create-lottery.input");
let CreateBetInput = class CreateBetInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { pick: { type: () => String }, target: { type: () => Number }, upDown: { nullable: true, type: () => Boolean }, lottery: { type: () => require("../../lotteries/dto/create-lottery.input").CreateLotteryInput } };
    }
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateBetInput.prototype, "pick", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Number)
], CreateBetInput.prototype, "target", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], CreateBetInput.prototype, "upDown", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", create_lottery_input_1.CreateLotteryInput)
], CreateBetInput.prototype, "lottery", void 0);
CreateBetInput = __decorate([
    graphql_1.InputType()
], CreateBetInput);
exports.CreateBetInput = CreateBetInput;
//# sourceMappingURL=create-bet.input.js.map