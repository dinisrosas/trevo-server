import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRoleEnum } from 'src/types';
import { CreateUserInput } from './dto/create-user.input';
import { UpdatePasswordInput, UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@UseGuards(GqlAuthGuard, RolesGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  me(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findOneById(user.id);
  }

  @Roles(UserRoleEnum.Admin)
  @Mutation(() => User)
  registerSeller(@Args('input') input: CreateUserInput): Promise<User> {
    return this.usersService.register(input);
  }

  @Query(() => [User], { name: 'users' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findByUsername(
    @Args('username', { type: () => String }) username: string,
  ): Promise<User> {
    return this.usersService.findOneByUsername(username);
  }

  @Mutation(() => User)
  updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    return this.usersService.update(input.id, input);
  }

  @Mutation(() => User)
  updatePassword(
    @CurrentUser() user: User,
    @Args('input') input: UpdatePasswordInput,
  ): Promise<User> {
    return this.usersService.updatePassword(user.id, input);
  }

  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
