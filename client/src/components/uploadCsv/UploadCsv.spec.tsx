import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UploadCsv from './UploadCsv';
import { uploadCSV } from '../../services/uploadCSV';
import { getCSVDataTotalAmountsByYear } from '../../services/getCSVDataByYear';

jest.mock('../../services/uploadCSV');
jest.mock('../../services/getCSVDataByYear');

const mockUploadCSV = uploadCSV as jest.Mock;
const mockGetCSVDataTotalAmountsByYear = getCSVDataTotalAmountsByYear as jest.Mock;

describe('UploadCsv component', () => {

    beforeEach(() => {
        mockUploadCSV.mockReset();
        mockGetCSVDataTotalAmountsByYear.mockReset();
    });


    it('should display an error if a non-CSV file is selected', async () => {
        render(<UploadCsv />);

        const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
        const input = screen.getByLabelText(/Select File/i) as HTMLInputElement;

        fireEvent.change(input, { target: { files: [file] } });

        await waitFor(() => {
            expect(screen.getByText(/Invalid file format/i)).toBeInTheDocument();
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
            expect(screen.getByText(/Uploading.../i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(mockUploadCSV).toHaveBeenCalledTimes(1);
            expect(mockGetCSVDataTotalAmountsByYear).toHaveBeenCalledTimes(1);
            expect(screen.queryByText(/Uploading.../i)).not.toBeInTheDocument();
        });
    });

    it('should display an error message if the upload fails', async () => {
        render(<UploadCsv />);

        const file = new File(['year,total'], 'example.csv', { type: 'text/csv' });

        mockUploadCSV.mockRejectedValueOnce(new Error('Failed to upload'));

        const input = screen.getByLabelText(/Select File/i) as HTMLInputElement;
        fireEvent.change(input, { target: { files: [file] } });

        await waitFor(() => {
            expect(screen.getByText(/Uploading.../i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText(/Failed to upload file. Please try again./i)).toBeInTheDocument();
        });
    });
});
