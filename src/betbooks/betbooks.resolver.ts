import { UseGuards } from "@nestjs/common";
import { Args, ID, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { AuthUser } from "src/types";
import { BetbooksService } from "./betbooks.service";
import { CreateBetbookInput } from "./dto/create-betbook.input";
import { UpdateBetbookInput } from "./dto/update-betbook.input";
import { Betbook, BetbookConnection } from "./entities/betbook.entity";

@UseGuards(GqlAuthGuard)
@Resolver(() => Betbook)
export class BetbooksResolver {
  constructor(private readonly betbooksService: BetbooksService) {}

  @Mutation(() => Betbook)
  createBetbook(
    @CurrentUser() user: AuthUser,
    @Args("createBetbookInput") createBetbookInput: CreateBetbookInput
  ): Promise<Betbook> {
    return this.betbooksService.create({
      ...createBetbookInput,
      sellerId: user.id,
    });
  }

  @Query(() => BetbookConnection, { name: "betbooks" })
  findAll(
    @CurrentUser() user: AuthUser,
    @Args("fixed", { nullable: true }) fixed?: boolean,
    @Args("after", { nullable: true }) after?: string,
    @Args("first", { nullable: true, type: () => Int }) first?: number
  ): Promise<BetbookConnection> {
    return this.betbooksService.findAllBySeller(user.id, fixed, after, first);
  }

  @Query(() => Betbook, { name: "betbook" })
  findOne(@Args("id", { type: () => ID }) id: string): Promise<Betbook> {
    return this.betbooksService.findOne(id);
  }

  @Mutation(() => Betbook)
  updateBetbook(
    @Args("updateBetbookInput") updateBetbookInput: UpdateBetbookInput
  ): Promise<Betbook> {
    return this.betbooksService.update(
      updateBetbookInput.id,
      updateBetbookInput
    );
  }

  @Mutation(() => Betbook)
  deleteBetbook(@Args("id", { type: () => ID }) id: string): Promise<Betbook> {
    return this.betbooksService.delete(id);
  }
}
