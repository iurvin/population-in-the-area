import { store, StoreContext } from './Store.ts';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode | ReactNode[];
}

export function StoreProvider({ children }: Props) {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}