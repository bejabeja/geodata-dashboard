import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export function useFilters() {
    const { filters, setFilters } = useContext(DataContext)

    const filterYear = (year: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            year,
        }));
    };

    return {
        filters, setFilters, filterYear
    }
}