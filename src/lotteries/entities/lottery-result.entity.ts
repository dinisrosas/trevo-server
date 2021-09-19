import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LotteryResult {
  @Field()
  result: string;

  @Field()
  isoDate: string;
}
