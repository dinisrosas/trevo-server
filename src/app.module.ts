import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BetbooksModule } from './betbooks/betbooks.module';
import { BetsModule } from './bets/bets.module';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import { formatGraphQLError } from './utils/graphql';

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
    GraphQLModule.forRoot({
      useGlobalPrefix: true,
      autoSchemaFile: 'schema.gql',
      formatError: formatGraphQLError,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
