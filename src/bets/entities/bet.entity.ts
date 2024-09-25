import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { GameType } from "@prisma/client";
import { Betbook } from "src/betbooks/entities/betbook.entity";
import { Connection } from "src/common/generics/pagination.entity";
import { Game } from "src/games/entities/game.entity";

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

  @Field({ nullable: true })
  awardDescription?: string;

  @Field(() => Game)
  game?: Game;

  @Field(() => Betbook)
  betbook?: Betbook;

  @Field({ nullable: true })
  updown?: boolean;

  @Field(() => Int, { nullable: true })
  ball?: number;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class BetConnection extends Connection(Bet) {}

@ObjectType()
export class BetSummary {
  @Field()
  date: string;

  @Field()
  amount: number;

  @Field()
  award: number;

  @Field()
  profit: number;

  @Field({ nullable: true })
  result?: string;
}
