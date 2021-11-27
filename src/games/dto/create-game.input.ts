import { Field, InputType } from '@nestjs/graphql';
import { GameType } from 'src/types';

@InputType()
export class CreateGameInput {
  @Field()
  type: GameType;

  @Field()
  isoDate: string;
}
