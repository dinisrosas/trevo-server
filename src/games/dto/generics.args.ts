import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/generics/pagination.entity';

@ArgsType()
export class FindAllBySellerArgs extends PaginationArgs {
  @Field({ nullable: true })
  finished?: boolean;

  @Field({ nullable: true })
  date?: string;
}
