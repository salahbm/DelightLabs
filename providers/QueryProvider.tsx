import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';
import React from 'react';
import { Alert } from 'react-native';

const QueryProvider = ({ children }: PropsWithChildren<any>) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
          mutations: {
            retry: 0,
          },
        },
        queryCache: new QueryCache({
          onError: (error: Error | any, query) => {
            if (error.response) {
              Alert.alert(error.response);
              return;
            }

            if (query?.state.data === undefined) {
              Alert.alert(error?.message);
              return;
            }
            if (query?.state.data !== undefined) {
              Alert.alert(error?.message);
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error: Error | any) => {
            if (error.response) {
              Alert.alert(error?.response);
            }
          },
        }),
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
