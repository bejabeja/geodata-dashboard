import React, { useState } from 'react';
import Card from './cards/Card';
import './Sidebar.css';
import { useCsvData } from '../../hooks/useCsvData';
import FilterSlider from '../filters/FilterSlider';

function Sidebar() {
    const { totalAmounts } = useCsvData();
    const [selectedDropdownValues, setselectedDropdownValues] = useState<{ [key: string]: number }>({});

    const sidebarValues = Object.keys(totalAmounts);

    const handleDropdownChange = (key: string, event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setselectedDropdownValues((prevState) => ({
            ...prevState,
            [key]: Number(selectedValue),
        }));
    };

    return (
        <main>
            <header className='sidebar-header'>
                <h2>Studied cases</h2>
                <FilterSlider />
            </header>

            <div className='sidebar-content'>

                <div className='cardGrid'>
                    {sidebarValues.map((key: string, index: number) => {
                        const value = totalAmounts[key];
                        if (typeof value === 'number') {
                            return <Card key={index} title={key} value={value}  />;
                        }
                        return null;
                    })}
                </div>
                <div className='maindropdown-container'>
                    {sidebarValues.map((key: string, index: number) => {
                        const value = totalAmounts[key];

                        if (typeof value === 'object') {
                            const dropdownOptions = Object.keys(value);

                            return (
                                <div key={`${key}-dropdown`} className="dropdown-container">
                                    <label className='dropdown-label'>{key}</label>
                                    <select
                                        value={selectedDropdownValues[key] || ''}
                                        onChange={(e) => handleDropdownChange(key, e)}
                                    >
                                        <option value="" disabled>
                                            Select an option
                                        </option>
                                        {dropdownOptions.map((subKey: string) => (
                                            <option key={`${key}-${subKey}`} value={value[subKey]}>
                                                {subKey}
                                            </option>
                                        ))}
                                    </select>

                                    {selectedDropdownValues[key] !== undefined && selectedDropdownValues[key] !== 0 && (
                                        <Card
                                            key={`${key}-${selectedDropdownValues[key]}`}
                                            title=''
                                            value={selectedDropdownValues[key]}
                                        />
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </main>
    );
}

export default Sidebar;
