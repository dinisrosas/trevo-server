import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Betbook } from "src/betbooks/entities/betbook.entity";
import { Lottery } from "src/lotteries/entities/lottery.entity";

@ObjectType()
export class Bet {
  @Field(() => ID)
  id: string;

  @Field()
  sid: number;

  @Field()
  target: number;

  @Field()
  pick: string;

  @Field()
  amount: number;

  @Field({ nullable: true })
  award?: number;

  @Field(() => Lottery)
  lottery?: Lottery;

  @Field(() => Betbook)
  betbook?: Betbook;

  @Field({ nullable: true })
  upDown?: boolean;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}
