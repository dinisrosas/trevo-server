import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Bet } from "src/bets/entities/bet.entity";
import {
  Connection
} from "src/common/generics/pagination.entity";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class Betbook {
  @Field(() => ID)
  id: string;

  @Field()
  sid: number;

  @Field()
  bettor: string;

  @Field({ defaultValue: false })
  fixed: boolean;

  @Field()
  seller?: User;

  @Field(() => [Bet])
  bets?: Bet[];

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class BetbookConnection extends Connection(Betbook) {}