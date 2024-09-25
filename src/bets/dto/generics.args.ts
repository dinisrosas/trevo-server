import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationArgs } from "src/common/generics/pagination.entity";

@ArgsType()
export class FindActiveArgs extends PaginationArgs {
  @Field({ nullable: true })
  date?: string;
}

@ArgsType()
export class FindAllArgs extends PaginationArgs {}
