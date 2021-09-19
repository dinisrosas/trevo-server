import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Bet } from "src/bets/entities/bet.entity";
import { LotteryMode, LotteryType } from "src/types";

@ObjectType()
export class Lottery {
  @Field(() => ID)
  id: string;

  @Field()
  sid: number;

  @Field()
  name: string;

  @Field()
  type: LotteryType;

  @Field()
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
