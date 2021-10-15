import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class QueryBetbooksInput {
  @Field()
  fixed?: boolean;
}
