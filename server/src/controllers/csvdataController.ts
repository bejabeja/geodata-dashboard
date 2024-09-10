import { Request, Response } from 'express';
import { setNewCSVFileToCache } from '../services/readCsvService';
import { groupCsvDataByDate, groupCSVByTotalAmounts } from '../services/csvdataService'
import fs from 'fs';


export const uploadCsvData = async (req: Request, res: Response) => {
    if (!req.file || !req.file.path) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const currentYear = new Date().getFullYear().toString();

    try {
        setNewCSVFileToCache(filePath);
        const dataYear = await groupCsvDataByDate(currentYear);
        await groupCSVByTotalAmounts(currentYear)
        res.json(dataYear);
    } catch (error) {
        console.error('Error uploading or processing CSV data:', error);
        res.status(500).send('Error uploading or processing CSV data');
    } finally {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
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