import { GraphQLError } from 'graphql';

function createError(message: string, status: number): GraphQLError {
  let code;

  switch (status) {
    case 400:
      code = 'BAD_REQUEST';
      break;
    case 401:
      code = 'UNAUTHORIZED';
      break;
    case 403:
      code = 'FORBIDDEN';
      break;
    case 404:
      code = 'NOT_FOUND';
      break;
    case 405:
      code = 'METHOD_NOT_ALLOWED';
      break;
    case 409:
      code = 'CONFLICT';
      break;
    case 410:
      code = 'GONE';
      break;
    case 429:
      code = 'TOO_MANY_REQUESTS';
      break;
    case 500:
      code = 'INTERNAL_SERVER_ERROR';
      break;
    case 501:
      code = 'NOT_IMPLEMENTED';
      break;
    case 503:
      code = 'SERVICE_UNAVAILABLE';
      break;
    default:
      code = 'INTERNAL_SERVER_ERROR';
      break;
  }

  return new GraphQLError(message, {
    extensions: { code },
  });
}

export default createError;
