import { Field, InputType } from "@nestjs/graphql";
import { LotteryType } from "src/types";

@InputType()
export class CreateLotteryInput {
  @Field()
  type: LotteryType;

  @Field()
  isoDate: string;
}
