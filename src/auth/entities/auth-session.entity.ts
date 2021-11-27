import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthSession {
  @Field()
  token: string;
}
