import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/generics/pagination.entity';

@ArgsType()
export class FindAllArgs extends PaginationArgs {
  @Field({ nullable: true })
  fixed?: boolean;
}
