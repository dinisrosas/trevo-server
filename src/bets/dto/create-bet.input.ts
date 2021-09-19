import { Field, InputType } from "@nestjs/graphql";
import { CreateLotteryInput } from "src/lotteries/dto/create-lottery.input";

@InputType()
export class CreateBetInput {
  @Field()
  pick: string;

  @Field()
  target: number;

  @Field({ nullable: true })
  upDown?: boolean;

  @Field()
  lottery: CreateLotteryInput;
}