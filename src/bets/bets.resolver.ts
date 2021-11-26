import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { BetsService } from "./bets.service";
import { UpdateBetInput } from "./dto/update-bet.input";
import { Bet } from "./entities/bet.entity";

@UseGuards(GqlAuthGuard)
@Resolver(() => Bet)
export class BetsResolver {
  constructor(private readonly betsService: BetsService) {}

  @Query(() => [Bet], { name: "bets" })
  findAll(): Promise<Bet[]> {
    return this.betsService.findAll();
  }

  @Query(() => Bet, { name: "bet" })
  findOne(@Args("id", { type: () => ID }) id: string): Promise<Bet> {
    return this.betsService.findOne(id);
  }

  @Mutation(() => Bet)
  updateBet(@Args("input") input: UpdateBetInput): Promise<Bet> {
    return this.betsService.update(input.id, input);
  }

  @Mutation(() => Bet)
  deleteBet(@Args("id", { type: () => ID }) id: string): Promise<Bet> {
    return this.betsService.delete(id);
  }
}
