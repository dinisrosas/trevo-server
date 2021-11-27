import { Field, InputType } from '@nestjs/graphql';
import { CreateGameInput } from 'src/games/dto/create-game.input';

@InputType()
export class CreateBetInput {
  @Field()
  pick: string;

  @Field()
  target: number;

  @Field({ nullable: true })
  updown?: boolean;

  @Field({ nullable: true })
  ball?: number;

  @Field()
  game: CreateGameInput;
}
