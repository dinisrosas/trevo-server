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
exports.UpdatePasswordInput = exports.UpdateUserInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let UpdateUserInput = class UpdateUserInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, name: { type: () => String }, username: { type: () => String } };
    }
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "username", void 0);
UpdateUserInput = __decorate([
    graphql_1.InputType()
], UpdateUserInput);
exports.UpdateUserInput = UpdateUserInput;
let UpdatePasswordInput = class UpdatePasswordInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { currentPassword: { type: () => String }, newPassword: { type: () => String } };
    }
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdatePasswordInput.prototype, "currentPassword", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdatePasswordInput.prototype, "newPassword", void 0);
UpdatePasswordInput = __decorate([
    graphql_1.InputType()
], UpdatePasswordInput);
exports.UpdatePasswordInput = UpdatePasswordInput;
//# sourceMappingURL=update-user.input.js.map