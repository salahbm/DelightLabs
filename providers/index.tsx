import { PropsWithChildren } from 'react';
import SafeAreaRootProvider from './SafeAreaProvider';
import QueryProvider from './QueryProvider';
import { RecoilProvider } from './RecoilProvider';

const RootProvider = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaRootProvider>
      <RecoilProvider>
        <QueryProvider>{children}</QueryProvider>
      </RecoilProvider>
    </SafeAreaRootProvider>
  );
};

export default RootProvider;
