import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GameResult {
  @Field()
  result: string;

  @Field()
  isoDate: string;
}
