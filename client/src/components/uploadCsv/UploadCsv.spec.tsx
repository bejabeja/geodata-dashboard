import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UploadCsv from './UploadCsv';
import { uploadCSV } from '../../services/uploadCSV';
import { getCSVDataTotalAmountsByYear } from '../../services/getCSVDataByYear';
import { useCsvData } from '../../hooks/useCsvData';
import { useFilters } from '../../hooks/userFilters';

jest.mock('../../services/uploadCSV');
jest.mock('../../services/getCSVDataByYear');

jest.mock('../../hooks/useCsvData');
jest.mock('../../hooks/userFilters');

const mockSetCsvData = jest.fn();
const mockSetTotalAmounts = jest.fn();
const mockSetErrors = jest.fn();
const mockSetFilters = jest.fn();

const mockUseCsvData = useCsvData as jest.Mock;
const mockUseFilters = useFilters as jest.Mock;

const mockUploadCSV = uploadCSV as jest.Mock;
const mockGetCSVDataTotalAmountsByYear = getCSVDataTotalAmountsByYear as jest.Mock;

describe('UploadCsv component', () => {

    beforeEach(() => {
        mockUploadCSV.mockReset();
        mockGetCSVDataTotalAmountsByYear.mockReset();

        mockUseCsvData.mockReturnValue({
            setCsvData: mockSetCsvData,
            setTotalAmounts: mockSetTotalAmounts,
            setErrors: mockSetErrors,
            errors: null,
        });

        mockUseFilters.mockReturnValue({
            setFilters: mockSetFilters,
        });
    });

    it('should display an error if a non-CSV file is selected', async () => {
        render(<UploadCsv />);

        const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
        const input = screen.getByLabelText(/Select File/i) as HTMLInputElement;

        fireEvent.change(input, { target: { files: [file] } });

        await waitFor(() => {
            expect(mockSetErrors).toHaveBeenCalledWith({ message: 'Invalid file format. Only CSV files are allowed.' });
        });
    });

    it('should handle CSV upload correctly and update the UI', async () => {
        render(<UploadCsv />);

        const file = new File(['latitude,longitude,specie,total\n10.1, 11.2, turtle, 1000'], 'example.csv', { type: 'text/csv' });

        mockUploadCSV.mockResolvedValueOnce([{ latitude: 10.1, longitude: 11.2, specie: 'turtle', total: 1000 }]);
        mockGetCSVDataTotalAmountsByYear.mockResolvedValueOnce({ specie: { turtle: 1, total: 1000 } });

        const input = screen.getByLabelText(/Select File/i) as HTMLInputElement;

        fireEvent.change(input, { target: { files: [file] } });

        await waitFor(() => {
            expect(mockUploadCSV).toHaveBeenCalledTimes(1);
            expect(mockGetCSVDataTotalAmountsByYear).toHaveBeenCalledTimes(1);
            expect(mockSetCsvData).toHaveBeenCalledWith([{ latitude: 10.1, longitude: 11.2, specie: 'turtle', total: 1000 }]);
            expect(mockSetTotalAmounts).toHaveBeenCalledWith({ specie: { turtle: 1, total: 1000 } });
            expect(mockSetFilters).toHaveBeenCalledWith({ year: new Date().getFullYear().toString() });
        });
    });

    it('should display an error message if the upload fails', async () => {
        render(<UploadCsv />);

        const file = new File(['year,total'], 'example.csv', { type: 'text/csv' });

        mockUploadCSV.mockRejectedValueOnce(new Error('Failed to upload'));

        const input = screen.getByLabelText(/Select File/i) as HTMLInputElement;
        fireEvent.change(input, { target: { files: [file] } });

        await waitFor(() => {
            expect(mockSetErrors).toHaveBeenCalledWith({ message: 'Failed to upload' });
        });
    });

    it('should display a message while uploading', async () => {
        render(<UploadCsv />);

        const file = new File(['year,total'], 'example.csv', { type: 'text/csv' });

        mockUploadCSV.mockResolvedValueOnce([{ latitude: 10.1, longitude: 11.2, specie: 'turtle', total: 1000 }]);
        mockGetCSVDataTotalAmountsByYear.mockResolvedValueOnce({ specie: { turtle: 1, total: 1000 } });

        const input = screen.getByLabelText(/Select File/i) as HTMLInputElement;

        fireEvent.change(input, { target: { files: [file] } });

        await waitFor(() => {
            expect(screen.getByText(/Uploading.../i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.queryByText(/Uploading.../i)).not.toBeInTheDocument();
        });
    });

    it('should display an error if no file is selected', async () => {
        render(<UploadCsv />);

        const input = screen.getByLabelText(/Select File/i) as HTMLInputElement;

        fireEvent.change(input, { target: { files: [] } });

        await waitFor(() => {
            expect(mockSetErrors).toHaveBeenCalledWith({ message: 'No file selected. Please choose a CSV file.' });
        });
    });

    it('should display the name of the file once selected', async () => {
        render(<UploadCsv />);

        const file = new File(['year,total'], 'example.csv', { type: 'text/csv' });

        const input = screen.getByLabelText(/Select File/i) as HTMLInputElement;

        fireEvent.change(input, { target: { files: [file] } });

        await waitFor(() => {
            expect(screen.getByText(/example.csv/i)).toBeInTheDocument();
        });
    });
});
