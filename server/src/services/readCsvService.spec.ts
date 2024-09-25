import fs from 'fs';
import { setNewCSVFileToCache, getCachedCSVData, parseCSVFromBuffer } from './readCsvService';

jest.mock('fs');

describe('CSV Parsing Tests', () => {
    const mockCSVData = `latitude,longitude,timestamp,name
    40.730610,-73.935242,2023-09-24,Bird1
    34.052235,-118.243683,2023-09-25,Bird2
    34.052235,-118.243683,2023-11-25,Bird2
    51.507351,-0.127758,2023-11-26,Bird3,
    51.507351,-0.127758,2024-09-26,Bird3`;


    const mockBuffer = Buffer.from(mockCSVData);

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should correctly parse CSV data from buffer', async () => {
        await parseCSVFromBuffer(mockBuffer);
        const cachedData = await getCachedCSVData();
        expect(cachedData).toHaveLength(5);
        expect(cachedData[0].geocode).toEqual([40.730610, -73.935242]);
        expect(cachedData[0].timestamp).toBe('2023-09-24');
        expect(cachedData[0].name).toBe('Bird1');
    });

    it('should correctly remove empty lat or long data row from CSV rows', async () => {
        const csvWithEmptyFields = `latitude,longitude,timestamp,name
        40.730610,-73.935242,,Bird1
        ,,-,Bird2`;

        const bufferWithEmptyFields = Buffer.from(csvWithEmptyFields);

        await parseCSVFromBuffer(bufferWithEmptyFields);
        const cachedData = await getCachedCSVData();

        expect(cachedData).toHaveLength(1);
        expect(cachedData[0].geocode).toEqual([40.730610, -73.935242]);
        expect(cachedData[0].name).toBe('Bird1');
        expect(cachedData[0].timestamp).toBeNull();
    });

    it('should cache CSV data after parsing', async () => {
        await parseCSVFromBuffer(mockBuffer);
        const cachedData = await getCachedCSVData();
        const secondCachedDataCall = await getCachedCSVData();

        expect(cachedData).toBe(secondCachedDataCall);
    });

    it('should handle file not existing in setNewCSVFileToCache', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(false);

        expect(() => setNewCSVFileToCache('invalid-file.csv')).toThrowError('The file at invalid-file.csv does not exist.');
    });
});