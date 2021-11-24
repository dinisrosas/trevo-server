import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Bet } from "src/bets/entities/bet.entity";
import { PageInfo } from "src/common/entities/pagination.entity";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class Betbook {
  @Field(() => ID)
  id: string;

  @Field()
  sid: number;

  @Field()
  bettor: string;

  @Field({ defaultValue: false })
  fixed: boolean;

  @Field()
  seller?: User;

  @Field(() => [Bet])
  bets?: Bet[];

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class BetbookEdge {
  @Field()
  cursor: string;

  @Field(() => Betbook)
  node: Betbook;
}

@ObjectType()
export class BetbookConnection {
  @Field(() => [BetbookEdge])
  edges: BetbookEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
