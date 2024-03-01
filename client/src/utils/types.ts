import { ReactNode } from 'react';

export type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  confirm?: string;
  remember?: string;
};

export interface DataStorageContextProps {
  storedData: any;
  storeData: (newData: any) => void;
}

export interface DataStorageProviderProps {
  children: ReactNode;
}