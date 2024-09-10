import React, { useState } from 'react';
import { uploadCSV } from '../../services/uploadCSV';
import { useCsvData } from '../../hooks/useCsvData';
import { useFilters } from '../../hooks/userFilters';
import { getCSVDataTotalAmountsByYear } from '../../services/getCSVDataByYear';
import './UploadCsv.css';

export default function UploadCsv() {
    const { setCsvData, setTotalAmounts } = useCsvData()
    const { setFilters } = useFilters();
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            setFileName(file.name);
            setUploading(true);
            setError(null);
            const currentYear = new Date().getFullYear().toString()

            try {
                const response = await uploadCSV(formData);
                const totalAmountsData = await getCSVDataTotalAmountsByYear(currentYear);
                setTotalAmounts(totalAmountsData)
                setCsvData(response)
                setFilters({ year: currentYear });
            } catch (err) {
                console.error('Error uploading file:', err);
                setError('Failed to upload file. Please try again.');
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <div className="file-upload-container">
            <label className="custom-file-upload">
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                />
                <span>Select File</span>
            </label>
            <span>{fileName}</span>

            {uploading && <p className="upload-status">Uploading...</p>}
            {error && <p className="upload-error">{error}</p>}
        </div>
    );
}
