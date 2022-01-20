import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { AuthUser, GameType, UserRoleEnum } from 'src/types';
import { CreateGameInput } from './dto/create-game.input';
import { FindAllBySellerArgs } from './dto/generics.args';
import {
  UpdateGameInput,
  UpdateGameResultInput,
} from './dto/update-game.input';
import { GameResult } from './entities/game-result.entity';
import { Game, GameConnection } from './entities/game.entity';
import { GamesService } from './games.service';
import { getLatestGameResult } from './helpers/result.helper';

@UseGuards(GqlAuthGuard)
@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Mutation(() => Game)
  createGame(@Args('input') input: CreateGameInput): Promise<Game> {
    return this.gamesService.create(input);
  }

  @Query(() => GameConnection, { name: 'games' })
  findAll(
    @CurrentUser() user: AuthUser,
    @Args() args: FindAllBySellerArgs,
  ): Promise<GameConnection> {
    if (user.roles.includes(UserRoleEnum.Admin)) {
      return this.gamesService.findAll(args);
    }
    return this.gamesService.findAllBySeller(user.id, args);
  }

  @Query(() => Game, { name: 'game' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Game> {
    return this.gamesService.findOneById(id);
  }

  @Query(() => GameResult, { name: 'latestGameResult' })
  async findLastestResultByType(
    @Args('type') type: GameType,
  ): Promise<GameResult> {
    return await getLatestGameResult(type);
  }

  @Mutation(() => Game)
  updateGame(@Args('input') input: UpdateGameInput): Promise<Game> {
    return this.gamesService.update(input.id, input);
  }

  @Mutation(() => Game)
  updateGameResult(@Args('input') input: UpdateGameResultInput): Promise<Game> {
    return this.gamesService.updateResult(input.id, input.result);
  }

  @Mutation(() => Game)
  deleteGame(@Args('id', { type: () => ID }) id: string): Promise<Game> {
    return this.gamesService.remove(id);
  }
}
