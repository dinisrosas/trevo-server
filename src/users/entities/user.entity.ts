import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserRole } from "@prisma/client";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  sid: number;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  role: UserRole;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
