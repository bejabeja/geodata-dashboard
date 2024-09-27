import React from 'react';
import { FilterYearProps } from '../../types/FilterYear';
import './FilterYear.css';
import { useFilters } from '../../hooks/userFilters';

export default function FilterSlider({
    min = 1950,
    max = new Date().getFullYear(),
    step = 1,
    onChange
}: FilterYearProps) {
    const { filters, setFilters } = useFilters();

    const handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = Number(e.target.value);
        setFilters({ ...filters, year: String(newValue) });
        onChange?.(newValue);
    };

    const yearOptions = [];
    for (let year = min; year <= max; year++) {
        yearOptions.push(<option key={year} value={year}>{year}</option>);
    }

    return (
        <div className="filter-selector">
            <select
                id="year-selector"
                value={Number(filters.year) || min}
                onChange={handleChangeYear}
                className="year-selector-dropdown"
            >
                {yearOptions}
            </select>
        </div>
    );
}