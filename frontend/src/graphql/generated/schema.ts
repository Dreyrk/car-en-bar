import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Car = {
  __typename?: 'Car';
  id: Scalars['Int']['output'];
  owner?: Maybe<User>;
};

export type Carpool = {
  __typename?: 'Carpool';
  arrival: Position;
  arrival_time: Scalars['DateTimeISO']['output'];
  car: Car;
  carpool_type: Scalars['String']['output'];
  departure: Position;
  departure_time: Scalars['DateTimeISO']['output'];
  id: Scalars['Int']['output'];
  max_passengers: Scalars['Float']['output'];
  participants: Array<Participant>;
  price: Scalars['Float']['output'];
};

export type CarpoolInput = {
  arrivalId?: InputMaybe<Scalars['Int']['input']>;
  carId?: InputMaybe<Scalars['Int']['input']>;
  carpool_type?: InputMaybe<Scalars['String']['input']>;
  departureId?: InputMaybe<Scalars['Int']['input']>;
  departure_time?: InputMaybe<Scalars['DateTimeISO']['input']>;
  max_passengers?: InputMaybe<Scalars['Int']['input']>;
};

export type InputLogin = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type InputRegister = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCarpool: Carpool;
  deleteCarpool: Scalars['Boolean']['output'];
  login: Message;
  logout: Message;
  register: Message;
  updateCarpool?: Maybe<Carpool>;
};


export type MutationCreateCarpoolArgs = {
  carpool: CarpoolInput;
};


export type MutationDeleteCarpoolArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  user: InputLogin;
};


export type MutationRegisterArgs = {
  newUser: InputRegister;
};


export type MutationUpdateCarpoolArgs = {
  id: Scalars['Int']['input'];
  updatedCarpool: CarpoolInput;
};

export type Participant = {
  __typename?: 'Participant';
  carpool: Array<Carpool>;
  id: Scalars['Int']['output'];
  participant_type: Scalars['String']['output'];
  user: User;
};

export type Position = {
  __typename?: 'Position';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  postal_code: Scalars['String']['output'];
};

export type PreviousCarpool = {
  __typename?: 'PreviousCarpool';
  carpool: Carpool;
  comment?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  rating?: Maybe<Scalars['Int']['output']>;
  user: User;
};

export type Profile = {
  __typename?: 'Profile';
  carpools?: Maybe<Array<Participant>>;
  cars?: Maybe<Array<Car>>;
  created_at: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  password?: Maybe<Scalars['String']['output']>;
  previousCarpools?: Maybe<Array<PreviousCarpool>>;
  role: Scalars['String']['output'];
  updated_at: Scalars['DateTimeISO']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAllCarpools: Array<Carpool>;
  getCarpoolById?: Maybe<Carpool>;
  getProfile: Profile;
};


export type QueryGetAllCarpoolsArgs = {
  search: SearchArgs;
  sort?: InputMaybe<SortArgs>;
};


export type QueryGetCarpoolByIdArgs = {
  id: Scalars['Int']['input'];
};

export type SearchArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  passengers?: InputMaybe<Scalars['Float']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export type SortArgs = {
  departure?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Boolean']['input']>;
  travelTime?: InputMaybe<Scalars['Boolean']['input']>;
};

export type User = {
  __typename?: 'User';
  carpools?: Maybe<Array<Participant>>;
  cars?: Maybe<Array<Car>>;
  created_at: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  password: Scalars['String']['output'];
  previousCarpools?: Maybe<Array<PreviousCarpool>>;
  role: Scalars['String']['output'];
  updated_at: Scalars['DateTimeISO']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type LoginMutationVariables = Exact<{
  user: InputLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Message', success: boolean, message: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'Message', success: boolean, message: string } };

export type RegisterMutationVariables = Exact<{
  newUser: InputRegister;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Message', success: boolean, message: string } };

export type AllCarpoolsQueryVariables = Exact<{
  search: SearchArgs;
  sort?: InputMaybe<SortArgs>;
}>;


export type AllCarpoolsQuery = { __typename?: 'Query', getAllCarpools: Array<{ __typename?: 'Carpool', id: number, departure_time: any, arrival_time: any, price: number, max_passengers: number, carpool_type: string, departure: { __typename?: 'Position', address: string, city: string, country: string, postal_code: string }, arrival: { __typename?: 'Position', address: string, city: string, country: string, postal_code: string }, participants: Array<{ __typename?: 'Participant', participant_type: string, user: { __typename?: 'User', username?: string | null } }> }> };

export type GetCarpoolByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCarpoolByIdQuery = { __typename?: 'Query', getCarpoolById?: { __typename?: 'Carpool', id: number, departure_time: any, arrival_time: any, max_passengers: number, price: number, carpool_type: string, departure: { __typename?: 'Position', id: number, address: string, city: string, country: string, postal_code: string }, arrival: { __typename?: 'Position', id: number, address: string, city: string, country: string, postal_code: string }, car: { __typename?: 'Car', id: number }, participants: Array<{ __typename?: 'Participant', id: number, participant_type: string, user: { __typename?: 'User', id: number, username?: string | null } }> } | null };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'Profile', id: number, username?: string | null, email: string, role: string, created_at: any, updated_at: any, cars?: Array<{ __typename?: 'Car', id: number, owner?: { __typename?: 'User', username?: string | null } | null }> | null, carpools?: Array<{ __typename?: 'Participant', participant_type: string, user: { __typename?: 'User', username?: string | null, id: number } }> | null, previousCarpools?: Array<{ __typename?: 'PreviousCarpool', id: number, rating?: number | null, comment?: string | null, user: { __typename?: 'User', username?: string | null }, carpool: { __typename?: 'Carpool', id: number, arrival: { __typename?: 'Position', address: string, city: string, country: string, postal_code: string }, departure: { __typename?: 'Position', address: string, city: string, country: string, postal_code: string } } }> | null } };


export const LoginDocument = gql`
    mutation Login($user: InputLogin!) {
  login(user: $user) {
    success
    message
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
    message
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($newUser: InputRegister!) {
  register(newUser: $newUser) {
    success
    message
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      newUser: // value for 'newUser'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AllCarpoolsDocument = gql`
    query AllCarpools($search: SearchArgs!, $sort: SortArgs) {
  getAllCarpools(search: $search, sort: $sort) {
    id
    departure_time
    arrival_time
    departure {
      address
      city
      country
      postal_code
    }
    arrival {
      address
      city
      country
      postal_code
    }
    participants {
      participant_type
      user {
        username
      }
    }
    price
    max_passengers
    carpool_type
  }
}
    `;

/**
 * __useAllCarpoolsQuery__
 *
 * To run a query within a React component, call `useAllCarpoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCarpoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCarpoolsQuery({
 *   variables: {
 *      search: // value for 'search'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useAllCarpoolsQuery(baseOptions: Apollo.QueryHookOptions<AllCarpoolsQuery, AllCarpoolsQueryVariables> & ({ variables: AllCarpoolsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCarpoolsQuery, AllCarpoolsQueryVariables>(AllCarpoolsDocument, options);
      }
export function useAllCarpoolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCarpoolsQuery, AllCarpoolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCarpoolsQuery, AllCarpoolsQueryVariables>(AllCarpoolsDocument, options);
        }
export function useAllCarpoolsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AllCarpoolsQuery, AllCarpoolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllCarpoolsQuery, AllCarpoolsQueryVariables>(AllCarpoolsDocument, options);
        }
export type AllCarpoolsQueryHookResult = ReturnType<typeof useAllCarpoolsQuery>;
export type AllCarpoolsLazyQueryHookResult = ReturnType<typeof useAllCarpoolsLazyQuery>;
export type AllCarpoolsSuspenseQueryHookResult = ReturnType<typeof useAllCarpoolsSuspenseQuery>;
export type AllCarpoolsQueryResult = Apollo.QueryResult<AllCarpoolsQuery, AllCarpoolsQueryVariables>;
export const GetCarpoolByIdDocument = gql`
    query GetCarpoolById($id: Int!) {
  getCarpoolById(id: $id) {
    id
    departure {
      id
      address
      city
      country
      postal_code
    }
    arrival {
      id
      address
      city
      country
      postal_code
    }
    departure_time
    arrival_time
    max_passengers
    price
    carpool_type
    car {
      id
    }
    participants {
      id
      user {
        id
        username
      }
      participant_type
    }
  }
}
    `;

/**
 * __useGetCarpoolByIdQuery__
 *
 * To run a query within a React component, call `useGetCarpoolByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarpoolByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarpoolByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCarpoolByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables> & ({ variables: GetCarpoolByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables>(GetCarpoolByIdDocument, options);
      }
export function useGetCarpoolByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables>(GetCarpoolByIdDocument, options);
        }
export function useGetCarpoolByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables>(GetCarpoolByIdDocument, options);
        }
export type GetCarpoolByIdQueryHookResult = ReturnType<typeof useGetCarpoolByIdQuery>;
export type GetCarpoolByIdLazyQueryHookResult = ReturnType<typeof useGetCarpoolByIdLazyQuery>;
export type GetCarpoolByIdSuspenseQueryHookResult = ReturnType<typeof useGetCarpoolByIdSuspenseQuery>;
export type GetCarpoolByIdQueryResult = Apollo.QueryResult<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile {
  getProfile {
    id
    username
    email
    role
    created_at
    updated_at
    cars {
      id
      owner {
        username
      }
    }
    carpools {
      participant_type
      user {
        username
        id
      }
    }
    previousCarpools {
      id
      rating
      user {
        username
      }
      comment
      carpool {
        id
        arrival {
          address
          city
          country
          postal_code
        }
        departure {
          address
          city
          country
          postal_code
        }
      }
    }
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export function useGetProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileSuspenseQueryHookResult = ReturnType<typeof useGetProfileSuspenseQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;