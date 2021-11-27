import { Field, InputType } from '@nestjs/graphql';
import { CreateBetInput } from 'src/bets/dto/create-bet.input';

@InputType()
export class CreateBetbookInput {
  @Field()
  bettor: string;

  @Field()
  fixed: boolean;

  @Field(() => [CreateBetInput])
  bets: CreateBetInput[];
}
