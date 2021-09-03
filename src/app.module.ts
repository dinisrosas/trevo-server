import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ScheduleModule } from "@nestjs/schedule";

import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { LotteriesModule } from "./lotteries/lotteries.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: "schema.gql",
    }),
    UsersModule,
    AuthModule,
    LotteriesModule,
  ],
})
export class AppModule {}
