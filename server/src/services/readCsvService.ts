import Papa from 'papaparse';
import path from 'path';
import fs from 'fs';
import { MarkerData } from '../types/MarkerData';
export interface CsvRow {
    [key: string]: any;
}

let cachedData: MarkerData[] | null = null;
let currentFilePath: string | null = null;

const defaultCsvFilePath = path.join(__dirname, '../data/data-birds.csv');

export function setNewCSVFileToCache(filePath: string): void {
    if (!fs.existsSync(filePath)) {
        throw new Error(`The file at ${filePath} does not exist.`);
    }
    currentFilePath = filePath;
    cachedData = null;
}

export const parseCSVFromBuffer = async (buffer: Buffer): Promise<void> => {
    return new Promise((resolve, reject) => {
        Papa.parse(buffer.toString('utf-8'), {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                cachedData = (results.data as CsvRow[])
                    .map(createMarkerData)
                    .filter((marker): marker is MarkerData => marker !== null);
                resolve();
            },
            error: (error: any) => reject(new Error('Error parsing the CSV file from buffer: ' + error.message)),
        });
    });
};

export async function getCachedCSVData(): Promise<MarkerData[]> {
    if (!cachedData) {
        const filePathToUse = currentFilePath || defaultCsvFilePath;
        cachedData = await parseCSVFile(filePathToUse);
        console.log('Data loaded and cached successfully.');
    }

    return cachedData;
}

export const parseCSVFile = (filePath: string): Promise<MarkerData[]> => {
    return new Promise((resolve, reject) => {
        try {
            const fileStream = fs.createReadStream(filePath);

            Papa.parse(fileStream, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const csvData: MarkerData[] = (results.data as CsvRow[])
                        .map(createMarkerData)
                        .filter((marker): marker is MarkerData => marker !== null);

                    resolve(csvData);
                },
                error: (error) => reject(new Error('Error parsing the CSV file: ' + error.message)),
            });
        } catch (err) {
            reject(new Error('Error reading the CSV file'));
        }
    });
};

function createMarkerData(row: CsvRow): MarkerData | null {
    const latitude = parseFloat(row.latitude);
    const longitude = parseFloat(row.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
        return null;
    }

    const cleanedRow = removeEmptyFields(row);

    return {
        geocode: [latitude, longitude],
        timestamp: row.timestamp || row.date || null,
        ...cleanedRow
    };
}

function removeEmptyFields(row: CsvRow): CsvRow {
    return Object.keys(row).reduce((acc, key) => {
        const value = row[key];
        if (value !== "" && value !== null && value !== undefined) {
            acc[key] = value;
        }
        return acc;
    }, {} as CsvRow);
}