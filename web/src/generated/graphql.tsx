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
};

export type Status = {
  __typename?: 'Status';
  status: Scalars['String'];
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