import { useContext } from "react";
import { DataContext } from '../context/DataContext'

export function useCsvData() {
    const context = useContext(DataContext);
    return context;
}
