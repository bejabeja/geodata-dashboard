import { Request, Response } from 'express';
import { setNewCSVFileToCache, parseCSVFromBuffer } from '../services/readCsvService';
import { groupCsvDataByDate, groupCSVByTotalAmounts } from '../services/csvdataService';
import path from 'path';

export const uploadCsvData = async (req: Request, res: Response) => {
    const currentYear = new Date().getFullYear().toString();

    try {
        if (!req.file || !req.file.buffer) {
            console.log('No file uploaded, using the default CSV.');
            const defaultFilePath = path.join(__dirname, '../data/data-birds.csv');
            setNewCSVFileToCache(defaultFilePath);
        } else {
            console.log('CSV file uploaded and processed from buffer.');
            await parseCSVFromBuffer(req.file.buffer);
        }

        const dataYear = await groupCsvDataByDate(currentYear);
        await groupCSVByTotalAmounts(currentYear);
        res.json(dataYear);
    } catch (error) {
        console.error('Error processing CSV data:', error);
        res.status(500).send('Error processing CSV data');
    }
};

export const getGroupedDataByYear = async (req: Request, res: Response) => {
    const currentYear = new Date().getFullYear().toString();
    const year = req.params.year || currentYear;
    try {
        const groupedData = await groupCsvDataByDate(year);
        res.json(groupedData);
    } catch (error) {
        res.status(500).send('Error grouping data by date');
    }
};

export const getGroupedDataByTotalAmounts = async (req: Request, res: Response) => {
    const currentYear = new Date().getFullYear().toString();
    const year = req.params.year || currentYear;
    try {
        const groupedData = await groupCSVByTotalAmounts(year);
        res.json(groupedData);
    } catch (error) {
        res.status(500).send('Error grouping data by total amounts per year');
    }
};