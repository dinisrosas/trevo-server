import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { GraphQLModule } from "@nestjs/graphql";
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from "./auth/auth.module";
import { BetbooksModule } from "./betbooks/betbooks.module";
import { BetsModule } from "./bets/bets.module";
import { LotteriesModule } from "./lotteries/lotteries.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: "schema.gql",
      formatError: (error) => {
        const graphQLFormattedError = {
          name: error.extensions?.exception?.name || error.name,
          code: error.extensions?.code || "SERVER_ERROR",
          status: error.extensions?.response?.statusCode,
          message:
            error.extensions?.exception?.response?.message || error.message,
        };
        return graphQLFormattedError;
      },
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    LotteriesModule,
    BetsModule,
    BetbooksModule,
  ],
})
export class AppModule {}
