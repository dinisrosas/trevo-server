import { Field, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Bet } from "src/bets/entities/bet.entity";
import { PageInfo } from "src/common/entities/pagination.entity";
import {
  LotteryMode,
  LotteryModeEnum,
  LotteryType,
  LotteryTypeEnum,
} from "src/types";

registerEnumType(LotteryModeEnum, {
  name: "LotteryMode",
});

registerEnumType(LotteryTypeEnum, {
  name: "LotteryType",
});

@ObjectType()
export class Lottery {
  @Field(() => ID)
  id: string;

  @Field()
  sid: number;

  @Field()
  name: string;

  @Field(() => LotteryTypeEnum)
  type: LotteryType;

  @Field(() => LotteryModeEnum)
  mode: LotteryMode;

  @Field()
  isoDate: string;

  @Field(() => [Bet])
  bets?: Bet[];

  @Field()
  date: Date;

  @Field({ nullable: true })
  result?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class LotteryEdge {
  @Field()
  cursor: string;

  @Field(() => Lottery)
  node: Lottery;
}

@ObjectType()
export class LotteryConnection {
  @Field(() => [LotteryEdge])
  edges: LotteryEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
