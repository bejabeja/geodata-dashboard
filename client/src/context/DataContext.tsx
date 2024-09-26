import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { getCSVDataByYear, getCSVDataTotalAmountsByYear } from '../services/getCSVDataByYear';
import { MarkerData } from '../types/MarkerData';
import { TotalAmountsData } from '../types/TotalAmountsData';
import { ErrorDetails } from '../types/ErrorDetails';


interface DataContextType {
    csvData: MarkerData[];
    totalAmounts: TotalAmountsData;
    filters: { year: string };
    errors: ErrorDetails | null;
    setFilters: React.Dispatch<React.SetStateAction<{ year: string }>>;
    setCsvData: React.Dispatch<React.SetStateAction<MarkerData[]>>;
    setTotalAmounts: React.Dispatch<React.SetStateAction<TotalAmountsData>>;
    setErrors: React.Dispatch<React.SetStateAction<ErrorDetails | null>>;

}

export const DataContext = createContext<DataContextType>({
    csvData: [],
    totalAmounts: {},
    filters: { year: new Date().getFullYear().toString() },
    errors: null,
    setFilters: () => { },
    setCsvData: () => { },
    setTotalAmounts: () => { },
    setErrors: () => { },
});

export function CSVDataProvider({ children }: { children: ReactNode }) {
    const [csvData, setCsvData] = useState<MarkerData[]>([]);
    const [totalAmounts, setTotalAmounts] = useState<TotalAmountsData>({});
    const [filters, setFilters] = useState({ year: new Date().getFullYear().toString() });
    const [errors, setErrors] = useState<ErrorDetails | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCSVDataByYear(filters.year);
                setCsvData(data);

                const totalAmountsData = await getCSVDataTotalAmountsByYear(filters.year);
                setTotalAmounts(totalAmountsData)
                setErrors(null);
            } catch (err) {
                console.error('Error loading CSV data' + err);
                setErrors({ message: 'Failed to load CSV data for the selected year.' });
            }
        };

        fetchData();

    }, [filters.year])


    return (
        <DataContext.Provider value={{ csvData, totalAmounts, filters, errors, setFilters, setCsvData, setTotalAmounts, setErrors }}>
            {children}
        </DataContext.Provider>
    );
}