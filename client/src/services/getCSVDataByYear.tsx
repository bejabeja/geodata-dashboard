import { MarkerData } from "../types/MarkerData";
import { TotalAmountsData } from "../types/TotalAmountsData";


export const getCSVDataByYear = async (year: string): Promise<MarkerData[]> => {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/csvdata/${year}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data for year ${year}: ${response.statusText}`);
        }

        const csvData: MarkerData[] = await response.json();
        return csvData;
    } catch (error) {
        console.error('Error fetching CSV data by year:', error);
        throw error;
    }
};

export const getCSVDataTotalAmountsByYear = async (year: string): Promise<TotalAmountsData> => {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/csvdata/total-amounts/${year}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data total amounts for year ${year}: ${response.statusText}`);
        }

        const csvDataTotalAmounts: TotalAmountsData = await response.json();
        return csvDataTotalAmounts;
    } catch (error) {
        console.error('Error fetching CSV data total amounts by year:', error);
        throw error;
    }
};