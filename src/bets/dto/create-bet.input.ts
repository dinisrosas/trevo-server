import { Field, InputType } from "@nestjs/graphql";
import { CreateLotteryInput } from "src/lotteries/dto/create-lottery.input";

@InputType()
export class CreateBetInput {
  @Field()
  pick: string;

  @Field()
  target: number;

  @Field({ nullable: true })
  updown?: boolean;

  @Field({ nullable: true })
  ball?: number;

  @Field()
  lottery: CreateLotteryInput;
}
