import { getCSVDataByYear, getCSVDataTotalAmountsByYear } from './getCSVDataByYear';
import { MarkerData } from '../types/MarkerData';
import { TotalAmountsData } from '../types/TotalAmountsData';

const mockEndpoint = process.env.REACT_APP_ENDPOINT = 'http://mockendpoint.com';

describe('getCSVDataByYear', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('fetches CSV data successfully for the given year', async () => {
        const mockData: MarkerData[] = [
            { id: 1, name: 'Marker 1', geocode: [10.0, 20.0] },
            { id: 2, name: 'Marker 2', geocode: [30.0, 40.0] }
        ];

        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const result = await getCSVDataByYear('2022');

        expect(fetchMock).toHaveBeenCalledWith(`${mockEndpoint}/csvdata/2022`, expect.any(Object));
        expect(result).toEqual(mockData);
    });

    it('throws an error for invalid year format', async () => {
        await expect(getCSVDataByYear('')).rejects.toThrow('Invalid year format. Please provide a four-digit year.');
        await expect(getCSVDataByYear('abc')).rejects.toThrow('Invalid year format. Please provide a four-digit year.');
        await expect(getCSVDataByYear('202')).rejects.toThrow('Invalid year format. Please provide a four-digit year.');
    });

    it('throws an error for future years', async () => {
        const futureYear = new Date().getFullYear() + 1;
        await expect(getCSVDataByYear(futureYear.toString())).rejects.toThrow('Year cannot be in the future.');
    });

    it('throws an error if the fetch fails', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to fetch data'));

        await expect(getCSVDataByYear('2022')).rejects.toThrow('Failed to fetch data');

        expect(fetchMock).toHaveBeenCalledWith(`${mockEndpoint}/csvdata/2022`, expect.any(Object));
    });
});

describe('getCSVDataTotalAmountsByYear', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('fetches CSV total amounts data successfully for the given year', async () => {
        const mockData: TotalAmountsData = {
            totalAmount: 1000,
            year: 2022,
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const result = await getCSVDataTotalAmountsByYear('2022');

        expect(fetchMock).toHaveBeenCalledWith(`${mockEndpoint}/csvdata/total-amounts/2022`, expect.any(Object));
        expect(result).toEqual(mockData);
    });

    it('throws an error if the fetch fails', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to fetch data'));

        await expect(getCSVDataTotalAmountsByYear('2022')).rejects.toThrow('Failed to fetch data');

        expect(fetchMock).toHaveBeenCalledWith(`${mockEndpoint}/csvdata/total-amounts/2022`, expect.any(Object));
    });
});
