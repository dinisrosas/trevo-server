import { Field, ID, ObjectType } from "@nestjs/graphql";
import { LotteryType } from "@prisma/client";

@ObjectType()
export class Lottery {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  type: LotteryType;

  @Field()
  iso_date: string;

  @Field()
  date: Date;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
