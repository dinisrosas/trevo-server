import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Bet } from "src/bets/entities/bet.entity";
import { Connection } from "src/common/generics/pagination.entity";
import { GameMode, GameModeEnum, GameType, GameTypeEnum } from "src/types";

registerEnumType(GameModeEnum, {
  name: "GameMode",
});

registerEnumType(GameTypeEnum, {
  name: "GameType",
});

@ObjectType()
export class Game {
  @Field(() => ID)
  id: string;

  @Field()
  sid: number;

  @Field()
  name: string;

  @Field(() => GameTypeEnum)
  type: GameType;

  @Field(() => GameModeEnum)
  mode: GameMode;

  @Field()
  isoDate: string;

  @Field(() => [Bet])
  bets?: Bet[];

  @Field()
  date: Date;

  @Field({ nullable: true })
  result?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class GameConnection extends Connection(Game) {}
