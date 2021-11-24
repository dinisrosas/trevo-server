import { UseGuards } from "@nestjs/common";
import { Args, ID, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { AuthUser, LotteryType } from "src/types";
import { CreateLotteryInput } from "./dto/create-lottery.input";
import { UpdateLotteryInput } from "./dto/update-lottery.input";
import { LotteryResult } from "./entities/lottery-result.entity";
import { Lottery, LotteryConnection } from "./entities/lottery.entity";
import { OncomingLottery } from "./entities/oncoming-lottery.entity";
import { getLatestLotteryResult } from "./helpers/result.helper";
import { LotteriesService } from "./lotteries.service";

@UseGuards(GqlAuthGuard)
@Resolver(() => Lottery)
export class LotteriesResolver {
  constructor(private readonly lotteriesService: LotteriesService) {}

  @Mutation(() => Lottery)
  createLottery(
    @Args("createLotteryInput") createLotteryInput: CreateLotteryInput
  ): Promise<Lottery> {
    return this.lotteriesService.create(createLotteryInput);
  }

  @Query(() => [OncomingLottery], { name: "oncomingLotteries" })
  findOncomingLotteries(): OncomingLottery[] {
    return this.lotteriesService.findOncoming();
  }

  @Query(() => LotteryConnection, { name: "lotteries" })
  findAllBySeller(
    @CurrentUser() user: AuthUser,
    @Args("date", { nullable: true }) date?: string,
    @Args("finished", { nullable: true }) finished?: boolean,
    @Args("after", { nullable: true }) after?: string,
    @Args("first", { nullable: true, type: () => Int }) first?: number
  ): Promise<LotteryConnection> {
    return this.lotteriesService.findAllBySeller(
      user.id,
      date,
      finished,
      after,
      first
    );
  }

  @Query(() => Lottery, { name: "lottery" })
  findOne(@Args("id", { type: () => ID }) id: string): Promise<Lottery> {
    return this.lotteriesService.findOneById(id);
  }

  // @Query(() => Lottery, { name: "lottery" })
  // findOneByTypeIsoDate(
  //   @Args("type") type: LotteryType,
  //   @Args("isoDate") isoDate: string
  // ): Promise<Lottery> {
  //   return this.lotteriesService.findOneByTypeIsoDate(type, isoDate);
  // }

  @Query(() => LotteryResult, { name: "latestLotteryResult" })
  async findLastestResultByType(
    @Args("type") type: LotteryType
  ): Promise<LotteryResult> {
    return await getLatestLotteryResult(type);
  }

  @Mutation(() => Lottery)
  updateLottery(
    @Args("updateLotteryInput") updateLotteryInput: UpdateLotteryInput
  ): Promise<Lottery> {
    return this.lotteriesService.update(
      updateLotteryInput.id,
      updateLotteryInput
    );
  }

  @Mutation(() => Lottery)
  updateLotteryResult(
    @Args("id", { type: () => ID }) id: string,
    @Args("result") result: string
  ): Promise<Lottery> {
    return this.lotteriesService.updateResult(id, result);
  }

  @Mutation(() => Lottery)
  removeLottery(@Args("id", { type: () => ID }) id: string): Promise<Lottery> {
    return this.lotteriesService.remove(id);
  }
}
