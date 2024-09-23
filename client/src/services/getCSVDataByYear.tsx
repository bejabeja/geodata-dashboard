import { MarkerData } from "../types/MarkerData";
import { TotalAmountsData } from "../types/TotalAmountsData";


export const getCSVDataByYear = async (year: string): Promise<MarkerData[]> => {
    const yearNumber = Number(year);
    if (!year || year.length !== 4 || isNaN(yearNumber)) {
        throw new Error('Invalid year format. Please provide a four-digit year.');
    }

    const currentYear = new Date().getFullYear();
    if (yearNumber > currentYear) {
        throw new Error('Year cannot be in the future.');
    }

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
        throw error;
    }
};