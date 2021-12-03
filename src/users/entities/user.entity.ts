import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserRoleEnum, UserRoles } from 'src/types';

registerEnumType(UserRoleEnum, {
  name: 'UserRole',
});

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

  @Field(() => [UserRoleEnum])
  roles: UserRoles;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
