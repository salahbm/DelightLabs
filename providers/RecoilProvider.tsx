import { PropsWithChildren } from 'react';
import { RecoilRoot } from 'recoil';

export const RecoilProvider = ({ children }: PropsWithChildren<any>) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
