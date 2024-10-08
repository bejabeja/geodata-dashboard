import React, { useState } from 'react';
import { uploadCSV } from '../../services/uploadCSV';
import { useCsvData } from '../../hooks/useCsvData';
import { useFilters } from '../../hooks/userFilters';
import { getCSVDataTotalAmountsByYear } from '../../services/getCSVDataByYear';
import './UploadCsv.css';

export default function UploadCsv() {
    const { setCsvData, setTotalAmounts, setErrors, errors } = useCsvData()
    const { setFilters } = useFilters();
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState<string>('No file chosen');

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            setErrors({ message: 'No file selected. Please choose a CSV file.' });
            return;
        }

        if (!file.name.endsWith('.csv')) {
            setErrors({ message: 'Invalid file format. Only CSV files are allowed.' });
            return;
        }

        setFileName(file.name);
        setUploading(true);
        setErrors(null);

        const formData = new FormData();
        formData.append('file', file);
        const currentYear = new Date().getFullYear().toString()

        try {
            const response = await uploadCSV(formData);
            const totalAmountsData = await getCSVDataTotalAmountsByYear(currentYear);
            setCsvData(response)
            setTotalAmounts(totalAmountsData)
            setFilters({ year: currentYear });
        } catch (err: any) {
            setErrors({ message: err.message });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="file-upload-container">
            <label htmlFor="file-upload" className="custom-file-upload">
                <input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    aria-describedby="file-upload-status"
                />
                <span>Select File</span>
            </label>
            <span>{fileName}</span>

            {uploading ? (
                <p id="file-upload-status" role="status" className="upload-status">
                    Uploading...
                </p>
            ) : errors ? (
                <p id="file-upload-status" role="alert" className="upload-error">
                    {errors.message}
                </p>
            ) : null}
        </div>
    );
}
