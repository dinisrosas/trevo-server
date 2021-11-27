import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Betbook } from 'src/betbooks/entities/betbook.entity';
import { Game } from 'src/games/entities/game.entity';

@ObjectType()
export class Bet {
  @Field(() => ID)
  id: string;

  @Field()
  sid: number;

  @Field()
  target: number;

  @Field()
  pick: string;

  @Field()
  amount: number;

  @Field({ nullable: true })
  award?: number;

  @Field(() => Game)
  game?: Game;

  @Field(() => Betbook)
  betbook?: Betbook;

  @Field({ nullable: true })
  updown?: boolean;

  @Field(() => Int, { nullable: true })
  ball?: number;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}
