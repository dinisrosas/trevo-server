import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
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
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      formatError: formatGraphQLError,
    }),
  ],
})
export class AppModule {}
