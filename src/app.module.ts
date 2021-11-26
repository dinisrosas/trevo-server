import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { GraphQLModule } from "@nestjs/graphql";
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from "./auth/auth.module";
import { BetbooksModule } from "./betbooks/betbooks.module";
import { BetsModule } from "./bets/bets.module";
import { GamesModule } from "./games/games.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
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
    GamesModule,
    BetsModule,
    BetbooksModule,
  ],
})
export class AppModule {}
