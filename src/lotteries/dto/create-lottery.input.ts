import { InputType, Field } from "@nestjs/graphql";
import { LotteryType } from "@prisma/client";

@InputType()
export class CreateLotteryInput {
  @Field()
  type: LotteryType;

  @Field()
  iso_date: string;
}
