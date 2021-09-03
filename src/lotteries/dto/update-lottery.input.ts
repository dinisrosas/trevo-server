import { Field, ID, InputType, Int } from "@nestjs/graphql";
import { Lottery } from "@prisma/client";

@InputType()
export class UpdateLotteryInput {
  @Field(() => ID)
  id: number;

  @Field()
  result: string;
}
