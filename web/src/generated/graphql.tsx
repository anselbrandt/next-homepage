import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Status;
  me?: Maybe<User>;
  getLike?: Maybe<Like>;
  getAllLikes: Likes;
  likes: PaginatedLikes;
  Favorite?: Maybe<Favorite>;
};


export type QueryGetLikeArgs = {
  id: Scalars['Int'];
};


export type QueryLikesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryFavoriteArgs = {
  postId: Scalars['String'];
};

export type Status = {
  __typename?: 'Status';
  status: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['Float'];
  postId: Scalars['String'];
  userId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  details: Favorite;
};

export type Favorite = {
  __typename?: 'Favorite';
  subreddit: Scalars['String'];
  title: Scalars['String'];
  preview: Scalars['String'];
  points: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Likes = {
  __typename?: 'Likes';
  likes: Array<Like>;
};

export type PaginatedLikes = {
  __typename?: 'PaginatedLikes';
  likes: Array<Like>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  addLike: Scalars['Boolean'];
  removeLike: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationAddLikeArgs = {
  input: LikeInput;
};


export type MutationRemoveLikeArgs = {
  postId: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  cookie?: Maybe<Cookie>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Cookie = {
  __typename?: 'Cookie';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LikeInput = {
  postId: Scalars['String'];
  subreddit: Scalars['String'];
  title: Scalars['String'];
  preview: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subscription: Notification;
};

export type Notification = {
  __typename?: 'Notification';
  message: Scalars['String'];
  time: Scalars['Float'];
};

export type RegularCookieFragment = (
  { __typename?: 'Cookie' }
  & Pick<Cookie, 'name' | 'value'>
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>, cookie?: Maybe<(
    { __typename?: 'Cookie' }
    & RegularCookieFragment
  )> }
);

export type AddLikeMutationVariables = Exact<{
  input: LikeInput;
}>;


export type AddLikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addLike'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type RemoveLikeMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type RemoveLikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeLike'>
);

export type GetAllLikesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLikesQuery = (
  { __typename?: 'Query' }
  & { getAllLikes: (
    { __typename?: 'Likes' }
    & { likes: Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'postId'>
    )> }
  ) }
);

export type LikesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type LikesQuery = (
  { __typename?: 'Query' }
  & { likes: (
    { __typename?: 'PaginatedLikes' }
    & Pick<PaginatedLikes, 'hasMore'>
    & { likes: Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'createdAt' | 'postId'>
      & { details: (
        { __typename?: 'Favorite' }
        & Pick<Favorite, 'subreddit' | 'preview'>
      ) }
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ServerStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerStatusQuery = (
  { __typename?: 'Query' }
  & { hello: (
    { __typename?: 'Status' }
    & Pick<Status, 'status'>
  ) }
);

export type QueryNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type QueryNotificationSubscription = (
  { __typename?: 'Subscription' }
  & { subscription: (
    { __typename?: 'Notification' }
    & Pick<Notification, 'message' | 'time'>
  ) }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularCookieFragmentDoc = gql`
    fragment RegularCookie on Cookie {
  name
  value
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
  cookie {
    ...RegularCookie
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}
${RegularCookieFragmentDoc}`;
export const AddLikeDocument = gql`
    mutation AddLike($input: LikeInput!) {
  addLike(input: $input)
}
    `;
export type AddLikeMutationFn = Apollo.MutationFunction<AddLikeMutation, AddLikeMutationVariables>;

/**
 * __useAddLikeMutation__
 *
 * To run a mutation, you first call `useAddLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLikeMutation, { data, loading, error }] = useAddLikeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddLikeMutation(baseOptions?: Apollo.MutationHookOptions<AddLikeMutation, AddLikeMutationVariables>) {
        return Apollo.useMutation<AddLikeMutation, AddLikeMutationVariables>(AddLikeDocument, baseOptions);
      }
export type AddLikeMutationHookResult = ReturnType<typeof useAddLikeMutation>;
export type AddLikeMutationResult = Apollo.MutationResult<AddLikeMutation>;
export type AddLikeMutationOptions = Apollo.BaseMutationOptions<AddLikeMutation, AddLikeMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
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
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
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
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
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
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveLikeDocument = gql`
    mutation RemoveLike($postId: String!) {
  removeLike(postId: $postId)
}
    `;
export type RemoveLikeMutationFn = Apollo.MutationFunction<RemoveLikeMutation, RemoveLikeMutationVariables>;

/**
 * __useRemoveLikeMutation__
 *
 * To run a mutation, you first call `useRemoveLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLikeMutation, { data, loading, error }] = useRemoveLikeMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useRemoveLikeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLikeMutation, RemoveLikeMutationVariables>) {
        return Apollo.useMutation<RemoveLikeMutation, RemoveLikeMutationVariables>(RemoveLikeDocument, baseOptions);
      }
export type RemoveLikeMutationHookResult = ReturnType<typeof useRemoveLikeMutation>;
export type RemoveLikeMutationResult = Apollo.MutationResult<RemoveLikeMutation>;
export type RemoveLikeMutationOptions = Apollo.BaseMutationOptions<RemoveLikeMutation, RemoveLikeMutationVariables>;
export const GetAllLikesDocument = gql`
    query GetAllLikes {
  getAllLikes {
    likes {
      postId
    }
  }
}
    `;

/**
 * __useGetAllLikesQuery__
 *
 * To run a query within a React component, call `useGetAllLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllLikesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllLikesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllLikesQuery, GetAllLikesQueryVariables>) {
        return Apollo.useQuery<GetAllLikesQuery, GetAllLikesQueryVariables>(GetAllLikesDocument, baseOptions);
      }
export function useGetAllLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllLikesQuery, GetAllLikesQueryVariables>) {
          return Apollo.useLazyQuery<GetAllLikesQuery, GetAllLikesQueryVariables>(GetAllLikesDocument, baseOptions);
        }
export type GetAllLikesQueryHookResult = ReturnType<typeof useGetAllLikesQuery>;
export type GetAllLikesLazyQueryHookResult = ReturnType<typeof useGetAllLikesLazyQuery>;
export type GetAllLikesQueryResult = Apollo.QueryResult<GetAllLikesQuery, GetAllLikesQueryVariables>;
export const LikesDocument = gql`
    query Likes($limit: Int!, $cursor: String) {
  likes(limit: $limit, cursor: $cursor) {
    hasMore
    likes {
      createdAt
      postId
      details {
        subreddit
        preview
      }
    }
  }
}
    `;

/**
 * __useLikesQuery__
 *
 * To run a query within a React component, call `useLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLikesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useLikesQuery(baseOptions: Apollo.QueryHookOptions<LikesQuery, LikesQueryVariables>) {
        return Apollo.useQuery<LikesQuery, LikesQueryVariables>(LikesDocument, baseOptions);
      }
export function useLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LikesQuery, LikesQueryVariables>) {
          return Apollo.useLazyQuery<LikesQuery, LikesQueryVariables>(LikesDocument, baseOptions);
        }
export type LikesQueryHookResult = ReturnType<typeof useLikesQuery>;
export type LikesLazyQueryHookResult = ReturnType<typeof useLikesLazyQuery>;
export type LikesQueryResult = Apollo.QueryResult<LikesQuery, LikesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ServerStatusDocument = gql`
    query ServerStatus {
  hello {
    status
  }
}
    `;

/**
 * __useServerStatusQuery__
 *
 * To run a query within a React component, call `useServerStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useServerStatusQuery(baseOptions?: Apollo.QueryHookOptions<ServerStatusQuery, ServerStatusQueryVariables>) {
        return Apollo.useQuery<ServerStatusQuery, ServerStatusQueryVariables>(ServerStatusDocument, baseOptions);
      }
export function useServerStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServerStatusQuery, ServerStatusQueryVariables>) {
          return Apollo.useLazyQuery<ServerStatusQuery, ServerStatusQueryVariables>(ServerStatusDocument, baseOptions);
        }
export type ServerStatusQueryHookResult = ReturnType<typeof useServerStatusQuery>;
export type ServerStatusLazyQueryHookResult = ReturnType<typeof useServerStatusLazyQuery>;
export type ServerStatusQueryResult = Apollo.QueryResult<ServerStatusQuery, ServerStatusQueryVariables>;
export const QueryNotificationDocument = gql`
    subscription QueryNotification {
  subscription {
    message
    time
  }
}
    `;

/**
 * __useQueryNotificationSubscription__
 *
 * To run a query within a React component, call `useQueryNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useQueryNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryNotificationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useQueryNotificationSubscription(baseOptions?: Apollo.SubscriptionHookOptions<QueryNotificationSubscription, QueryNotificationSubscriptionVariables>) {
        return Apollo.useSubscription<QueryNotificationSubscription, QueryNotificationSubscriptionVariables>(QueryNotificationDocument, baseOptions);
      }
export type QueryNotificationSubscriptionHookResult = ReturnType<typeof useQueryNotificationSubscription>;
export type QueryNotificationSubscriptionResult = Apollo.SubscriptionResult<QueryNotificationSubscription>;