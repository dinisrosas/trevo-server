import { Type } from '@nestjs/common';
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IPageInfoType {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface IConnectionType<T> {
  edges: IEdgeType<T>[];
  totalCount: number;
  pageInfo: IPageInfoType;
}

@ObjectType()
class PageInfo implements IPageInfoType {
  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field({ nullable: true })
  startCursor?: string;

  @Field({ nullable: true })
  endCursor?: string;
}

@ArgsType()
export class PaginationArgs {
  @Field({ nullable: true })
  before?: string;

  @Field({ nullable: true })
  after?: string;

  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => Int, { nullable: true })
  last?: number;
}

export function Connection<T>(classRef: Type<T>): Type<IConnectionType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class ConnectionType implements IConnectionType<T> {
    @Field(() => [EdgeType])
    edges: EdgeType[];

    @Field(() => Int)
    totalCount: number;

    @Field(() => PageInfo)
    pageInfo: IPageInfoType;
  }

  return ConnectionType as Type<IConnectionType<T>>;
}
