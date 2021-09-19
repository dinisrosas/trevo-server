import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Bet } from "src/bets/entities/bet.entity";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class Betbook {
  @Field(() => ID)
  id: string;

  @Field()
  sid: number;

  @Field()
  bettor: string;

  @Field()
  seller?: User;

  @Field(() => [Bet])
  bets?: Bet[];

  @Field()
  totalAmount: number;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}
