import { PropsWithChildren } from 'react';
import SafeAreaRootProvider from './SafeAreaProvider';
import QueryProvider from './QueryProvider';

const RootProvider = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaRootProvider>
      <QueryProvider>{children}</QueryProvider>
    </SafeAreaRootProvider>
  );
};

export default RootProvider;
