import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { getCSVDataByYear, getCSVDataTotalAmountsByYear } from '../services/getCSVDataByYear';
import { MarkerData } from '../types/MarkerData';
import { TotalAmountsData } from '../types/TotalAmountsData';


interface DataContextType {
    csvData: MarkerData[];
    totalAmounts: TotalAmountsData;
    filters: { year: string };
    setFilters: React.Dispatch<React.SetStateAction<{ year: string }>>;
    setCsvData: React.Dispatch<React.SetStateAction<MarkerData[]>>;
    setTotalAmounts: React.Dispatch<React.SetStateAction<TotalAmountsData>>;
}

export const DataContext = createContext<DataContextType>({
    csvData: [],
    totalAmounts: {},
    filters: { year: new Date().getFullYear().toString() },
    setFilters: () => { },
    setCsvData: () => { },
    setTotalAmounts: () => { },
});

export function CSVDataProvider({ children }: { children: ReactNode }) {
    const [csvData, setCsvData] = useState<MarkerData[]>([])
    const [totalAmounts, setTotalAmounts] = useState<TotalAmountsData>({})
    const [filters, setFilters] = useState({ year: new Date().getFullYear().toString() });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCSVDataByYear(filters.year);
                setCsvData(data);

                const totalAmountsData = await getCSVDataTotalAmountsByYear(filters.year);
                setTotalAmounts(totalAmountsData)
            } catch (err) {
                console.error('Error loading CSV data' + err);
            }
        };

        fetchData();

    }, [filters.year])


    return (
        <DataContext.Provider value={{ csvData, totalAmounts, filters, setFilters, setCsvData, setTotalAmounts }}>
            {children}
        </DataContext.Provider>
    );
}