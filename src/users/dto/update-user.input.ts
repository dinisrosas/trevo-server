import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  name: string;

  @Field(() => ID)
  username: string;
}
