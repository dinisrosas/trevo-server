import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { LotteriesService } from "./lotteries.service";
import { Lottery } from "./entities/lottery.entity";
import { CreateLotteryInput } from "./dto/create-lottery.input";
import { UpdateLotteryInput } from "./dto/update-lottery.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";

@UseGuards(GqlAuthGuard)
@Resolver(() => Lottery)
export class LotteriesResolver {
  constructor(private readonly lotteriesService: LotteriesService) {}

  @Mutation(() => Lottery)
  createLottery(
    @Args("createLotteryInput") createLotteryInput: CreateLotteryInput
  ) {
    return this.lotteriesService.create(createLotteryInput);
  }

  @Query(() => [Lottery], { name: "lotteries" })
  findAll() {
    return this.lotteriesService.findAll();
  }

  @Query(() => Lottery, { name: "lottery" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.lotteriesService.findOne(id);
  }

  @Mutation(() => Lottery)
  updateLottery(
    @Args("updateLotteryInput") updateLotteryInput: UpdateLotteryInput
  ) {
    return this.lotteriesService.update(
      updateLotteryInput.id,
      updateLotteryInput
    );
  }

  @Mutation(() => Lottery)
  removeLottery(@Args("id", { type: () => Int }) id: number) {
    return this.lotteriesService.remove(id);
  }
}
