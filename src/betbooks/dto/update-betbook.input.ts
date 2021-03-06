import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBetbookInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  fixed?: boolean;
}
