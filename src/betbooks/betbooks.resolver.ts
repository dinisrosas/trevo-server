import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { AuthUser, UserRoleEnum } from 'src/types';
import { BetbooksService } from './betbooks.service';
import { CreateBetbookInput } from './dto/create-betbook.input';
import { FindAllArgs } from './dto/find-all.args';
import { UpdateBetbookInput } from './dto/update-betbook.input';
import { Betbook, BetbookConnection } from './entities/betbook.entity';

@UseGuards(GqlAuthGuard)
@Resolver(() => Betbook)
export class BetbooksResolver {
  constructor(private readonly betbooksService: BetbooksService) {}

  @Mutation(() => Betbook)
  createBetbook(
    @CurrentUser() user: AuthUser,
    @Args('input') input: CreateBetbookInput,
  ): Promise<Betbook> {
    return this.betbooksService.create({
      ...input,
      sellerId: user.id,
    });
  }

  @Query(() => BetbookConnection, { name: 'betbooks' })
  findAll(
    @CurrentUser() user: AuthUser,
    @Args() args: FindAllArgs,
  ): Promise<BetbookConnection> {
    if (user.roles.includes(UserRoleEnum.Admin)) {
      return this.betbooksService.findAll(args);
    }
    return this.betbooksService.findAllBySeller(user.id, args);
  }

  @Query(() => Betbook, { name: 'betbook' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Betbook> {
    return this.betbooksService.findOneById(id);
  }

  @Mutation(() => Betbook)
  updateBetbook(@Args('input') input: UpdateBetbookInput): Promise<Betbook> {
    return this.betbooksService.update(input.id, input);
  }

  @Mutation(() => Betbook)
  deleteBetbook(@Args('id', { type: () => ID }) id: string): Promise<Betbook> {
    return this.betbooksService.delete(id);
  }
}
