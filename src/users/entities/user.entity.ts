import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserRole } from "@prisma/client";

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  role: UserRole;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
