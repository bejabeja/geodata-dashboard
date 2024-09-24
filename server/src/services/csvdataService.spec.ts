import { groupCsvDataByDate, groupCSVByTotalAmounts } from './csvdataService';
import * as readCsvService from './readCsvService';
import { MarkerData } from '../types/MarkerData';

jest.mock('./readCsvService');

describe('CSV Data Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('groupCsvDataByDate', () => {
        it('should group markers by year', async () => {
            const mockData: MarkerData[] = [
                { geocode: [10.0, 20.0], timestamp: '2024-01-01' },
                { geocode: [30.0, 40.0], timestamp: '2024-01-05' },
                { geocode: [50.0, 60.0], timestamp: '2023-01-01' },
            ];

            (readCsvService.getCachedCSVData as jest.Mock).mockResolvedValue(mockData);

            const result = await groupCsvDataByDate('2024');

            expect(result).toEqual([
                { geocode: [10.0, 20.0], timestamp: '2024-01-01' },
                { geocode: [30.0, 40.0], timestamp: '2024-01-05' },
            ]);
        });

        it('should return an empty array for a year with no data', async () => {
            const mockData: MarkerData[] = [
                { geocode: [10.0, 20.0], timestamp: '2023-01-01' },
                { geocode: [10.0, 20.0], timestamp: '2020-01-01' },
                { geocode: [10.0, 20.0], timestamp: '2021-01-01' },
            ];

            (readCsvService.getCachedCSVData as jest.Mock).mockResolvedValue(mockData);

            const result = await groupCsvDataByDate('2024');

            expect(result).toEqual([]);
        });

        it('should handle markers without a timestamp', async () => {
            const mockData: MarkerData[] = [
                { geocode: [10.0, 20.0] },
                { geocode: [30.0, 40.0], timestamp: '2024-01-05' },
            ];

            (readCsvService.getCachedCSVData as jest.Mock).mockResolvedValue(mockData);

            const result = await groupCsvDataByDate('2024');

            expect(result).toEqual([
                { geocode: [30.0, 40.0], timestamp: '2024-01-05' },
            ]);
        });

        it('should handle markers with invalid timestamp formats', async () => {
            const mockData: MarkerData[] = [
                { geocode: [10.0, 20.0], timestamp: 'invalid-date' },
                { geocode: [30.0, 40.0], timestamp: '2024-01-05' },
            ];

            (readCsvService.getCachedCSVData as jest.Mock).mockResolvedValue(mockData);

            const result = await groupCsvDataByDate('2024');

            expect(result).toEqual([{ geocode: [30.0, 40.0], timestamp: '2024-01-05' }]);
        });
    });

    describe('groupCSVByTotalAmounts', () => {
        it('should calculate total amounts correctly', async () => {
            const mockData: MarkerData[] = [
                { geocode: [10.0, 20.0], timestamp: '2024-01-01', amount: '100', species: '1' },
                { geocode: [30.0, 40.0], timestamp: '2024-01-05', amount: '200', species: '1' },
                { geocode: [50.0, 60.0], timestamp: '2023-01-01', amount: '50', species: '3' },
            ];

            (readCsvService.getCachedCSVData as jest.Mock).mockResolvedValue(mockData);

            const result = await groupCSVByTotalAmounts('2024');

            expect(result).toEqual({
                amount: 300,
                species: 2
            });
        });

        it('should return an empty object for a year with no data', async () => {
            const mockData: MarkerData[] = [
                { geocode: [10.0, 20.0], timestamp: '2023-01-01', amount: '50' },
                { geocode: [30.0, 40.0], timestamp: '2024-01-05', amount: '200' },
                { geocode: [50.0, 60.0], timestamp: '2023-06-07', amount: '560' },
            ];

            (readCsvService.getCachedCSVData as jest.Mock).mockResolvedValue(mockData);

            const result = await groupCSVByTotalAmounts('2019');

            expect(result).toEqual({});
        });

        it('should handle non-numeric fields correctly', async () => {
            const mockData: MarkerData[] = [
                { geocode: [10.0, 20.0], timestamp: '2024-01-01', amount: '100', category: 'A' },
                { geocode: [30.0, 40.0], timestamp: '2019-01-05', amount: '200', category: 'A' },
                { geocode: [50.0, 60.0], timestamp: '2019-01-01', amount: '50', category: 'B' },
                { geocode: [50.0, 60.0], timestamp: '2019-01-01', amount: '50', category: 'A' },

            ];

            (readCsvService.getCachedCSVData as jest.Mock).mockResolvedValue(mockData);

            const result = await groupCSVByTotalAmounts('2019');

            expect(result).toEqual({
                amount: 300,
                category: { 'A': 2, 'B': 1 },
            });
        });
    });
});
