import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { GraphQLModule } from "@nestjs/graphql";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { BetbooksModule } from "./betbooks/betbooks.module";
import { BetsModule } from "./bets/bets.module";
import { GamesModule } from "./games/games.module";
import { UsersModule } from "./users/users.module";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    UsersModule,
    AuthModule,
    GamesModule,
    BetsModule,
    BetbooksModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "schema.gql"),
      playground: true,
      introspection: true,
      hideSchemaDetailsFromClientErrors: true,
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
