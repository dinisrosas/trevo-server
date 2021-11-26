import { Field, ObjectType } from "@nestjs/graphql";
import { GameMode, GameType } from "@prisma/client";

@ObjectType()
export class OncomingGame {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  type: GameType;

  @Field()
  mode: GameMode;

  @Field()
  isoDate: string;

  @Field()
  date: Date;
}
