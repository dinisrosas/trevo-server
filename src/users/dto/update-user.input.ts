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

@InputType()
export class UpdatePasswordInput {
  @Field()
  currentPassword: string;

  @Field()
  newPassword: string;
}
