import { Field, ObjectType } from "@nestjs/graphql";
import { LotteryMode, LotteryType } from "@prisma/client";

@ObjectType()
export class OncomingLottery {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  type: LotteryType;

  @Field()
  mode: LotteryMode;

  @Field()
  isoDate: string;

  @Field()
  date: Date;
}
