import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateBetInput {
  @Field(() => ID)
  id: string;

  @Field()
  award: number;
}
