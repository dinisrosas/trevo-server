import { GraphQLError } from 'graphql';
import { FormattedGraphQLError } from 'src/types';

export function formatGraphQLError(error: GraphQLError): FormattedGraphQLError {
  return {
    message: error.message,
    code: error.extensions?.code,
    name: error.extensions?.response?.error,
    status: error.extensions?.response?.statusCode,
  };
}
