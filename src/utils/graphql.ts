import { GraphQLError } from 'graphql';
import { FormattedGraphQLError } from 'src/types';

export function formatGraphQLError(error: GraphQLError): FormattedGraphQLError {
  return {
    message: error.message,
    code: error.extensions?.exception?.response?.code || error.extensions?.code,
    name:
      error.extensions?.response?.error || error.extensions?.exception?.name,
    status:
      error.extensions?.response?.statusCode ||
      error.extensions?.exception?.status,
    data: error.extensions?.exception?.response?.data,
  };
}
