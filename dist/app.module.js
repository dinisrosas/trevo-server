"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const graphql_1 = require("@nestjs/graphql");
const schedule_1 = require("@nestjs/schedule");
const auth_module_1 = require("./auth/auth.module");
const betbooks_module_1 = require("./betbooks/betbooks.module");
const bets_module_1 = require("./bets/bets.module");
const games_module_1 = require("./games/games.module");
const users_module_1 = require("./users/users.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            games_module_1.GamesModule,
            bets_module_1.BetsModule,
            betbooks_module_1.BetbooksModule,
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql',
                installSubscriptionHandlers: true,
                formatError: (error) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    const graphQLFormattedError = {
                        name: ((_b = (_a = error.extensions) === null || _a === void 0 ? void 0 : _a.exception) === null || _b === void 0 ? void 0 : _b.name) || error.name,
                        code: ((_c = error.extensions) === null || _c === void 0 ? void 0 : _c.code) || 'SERVER_ERROR',
                        status: (_e = (_d = error.extensions) === null || _d === void 0 ? void 0 : _d.response) === null || _e === void 0 ? void 0 : _e.statusCode,
                        message: ((_h = (_g = (_f = error.extensions) === null || _f === void 0 ? void 0 : _f.exception) === null || _g === void 0 ? void 0 : _g.response) === null || _h === void 0 ? void 0 : _h.message) || error.message,
                    };
                    return graphQLFormattedError;
                },
            }),
            schedule_1.ScheduleModule.forRoot(),
            event_emitter_1.EventEmitterModule.forRoot(),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map