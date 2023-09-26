import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UserRoleEnum } from 'src/types';
import { BetsService } from './bets.service';
import { UpdateBetInput } from './dto/update-bet.input';
import { Bet } from './entities/bet.entity';
import { FindActiveArgs } from './dto/generics.args';

@UseGuards(GqlAuthGuard)
@Resolver(() => Bet)
export class BetsResolver {
  constructor(private readonly betsService: BetsService) {}

  @Roles(UserRoleEnum.Admin)
  @Query(() => [Bet], { name: 'bets' })
  findAll(): Promise<Bet[]> {
    return this.betsService.findAll();
  }

  @Query(() => [Bet], { name: 'activeBets' })
  findAllActive(
    @Args() args: FindActiveArgs,
  ): Promise<Bet[]> {
    return this.betsService.findAllActive(args);
  }

  @Query(() => Bet, { name: 'bet' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Bet> {
    return this.betsService.findOne(id);
  }

  @Mutation(() => Bet)
  updateBet(@Args('input') input: UpdateBetInput): Promise<Bet> {
    return this.betsService.update(input.id, input);
  }

  @Mutation(() => Bet)
  deleteBet(@Args('id', { type: () => ID }) id: string): Promise<Bet> {
    return this.betsService.delete(id);
  }
}
