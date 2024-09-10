import React from 'react';
import { FilterSliderProps } from '../../types/FilterSlider';
import './FilterSlider.css'; 
import { useFilters } from '../../hooks/userFilters';

export default function FilterSlider({
    min = 2000,
    max = new Date().getFullYear(),
    step = 1,
    onChange
}: FilterSliderProps) {
    const { filters, setFilters } = useFilters();

    const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setFilters({ ...filters, year: String(newValue) });
        onChange?.(newValue);
    }

    return (
        <div className="single-slider">
            <div className="single-value-info">
                <h2>{filters.year}</h2>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={Number(filters.year) || min}
                onChange={handleChangeYear}
                className="single-value-slider"
            />
        </div>
    );
}