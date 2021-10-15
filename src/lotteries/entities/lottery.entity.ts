import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Bet } from "src/bets/entities/bet.entity";
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
