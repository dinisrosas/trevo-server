import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBetInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field()
  award: number;

  @Field({ nullable: true })
  awardDescription?: string;
}
