import React, { useState, useEffect } from 'react';
import Card from './cards/Card';
import './Sidebar.css';
import { useCsvData } from '../../hooks/useCsvData';
import FilterSlider from '../filters/FilterYear';

function Sidebar() {
    const { totalAmounts } = useCsvData();
    const [selectedDropdownValues, setSelectedDropdownValues] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        setSelectedDropdownValues({});
    }, [totalAmounts]);

    const sidebarValues = Object.keys(totalAmounts || {});

    const handleDropdownChange = (key: string, event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedDropdownValues((prevState) => ({
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

            {sidebarValues.length === 0 ? <p>No data available.</p> :
                <div className='sidebar-content'>
                    <div className='cardGrid'>
                        {sidebarValues.map((key: string, index: number) => {
                            const value = totalAmounts[key];
                            if (typeof value !== 'number') {
                                return null
                            }
                            return <Card key={index} title={key} value={value} />;
                        })}
                    </div>
                    <div className='maindropdown-container'>
                        {sidebarValues.map((key: string) => {
                            const value = totalAmounts[key];

                            if (typeof value !== 'object') {
                                return null;
                            }
                            const dropdownOptions = Object.keys(value);

                            return (
                                <div key={`${key}-dropdown`} className="dropdown-container">
                                    <label className='dropdown-label'>{key}</label>
                                    <select
                                        value={selectedDropdownValues[key] || ''}
                                        onChange={(e) => handleDropdownChange(key, e)}
                                        aria-label={`Select option for ${key}`}
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

                                    {selectedDropdownValues[key] && (
                                        <Card
                                            key={`${key}-${selectedDropdownValues[key]}`}
                                            title=''
                                            value={selectedDropdownValues[key]}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            }
        </main>
    );
}

export default Sidebar;
