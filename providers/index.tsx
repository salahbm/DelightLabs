import { PropsWithChildren } from 'react';
import SafeAreaRootProvider from './SafeAreaProvider';

const RootProvider = ({ children }: PropsWithChildren) => {
  return <SafeAreaRootProvider>{children}</SafeAreaRootProvider>;
};

export default RootProvider;
