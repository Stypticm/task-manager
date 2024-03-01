import { createContext, useContext, useState } from 'react';
import { DataStorageContextProps, DataStorageProviderProps } from '../../utils/types';

const DataStorageContext = createContext<DataStorageContextProps | undefined>(undefined);

export const DataStorageProvider: React.FC<DataStorageProviderProps> = ({ children }) => {
    const [storedData, setStoredData] = useState<any>(null)

    const storeData = (newData: any) => {
        setStoredData(newData)
    }

    return (
        <DataStorageContext.Provider value={{ storedData, storeData }}>
            {children}
        </DataStorageContext.Provider>
    )
}

export const useDataStorage = (): DataStorageContextProps => {
    const context = useContext(DataStorageContext)

    if (!context) throw new Error('useDataStorage must be used within a DataStorageProvider')

    return context;
}