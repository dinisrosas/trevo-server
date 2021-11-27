import { Field, ID, InputType } from '@nestjs/graphql';
import { Game } from '../entities/game.entity';

@InputType()
export class UpdateGameInput extends Game {
  @Field(() => ID)
  id: string;
}

@InputType()
export class UpdateGameResultInput {
  @Field(() => ID)
  id: string;

  @Field()
  result: string;
}
