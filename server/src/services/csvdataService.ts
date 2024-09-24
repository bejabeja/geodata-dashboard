import { MarkerData } from "../types/MarkerData";
import { getCachedCSVData } from './readCsvService';

export async function groupCsvDataByDate(year: string): Promise<MarkerData[]> {
  const data = await getCachedCSVData();

  const groupedData = data.reduce((acc, marker) => {
    let yearFounded = 'Unknown Year';
    if (marker.timestamp) {
      const parsedDate = new Date(marker.timestamp);
      if (!isNaN(parsedDate.getTime())) {
        yearFounded = parsedDate.getFullYear().toString();
      }
    }

    if (!acc[yearFounded]) {
      acc[yearFounded] = [];
    }
    acc[yearFounded].push(marker);

    return acc;
  }, {} as Record<string, MarkerData[]>);

  return groupedData[year] || [];
}

export async function groupCSVByTotalAmounts(year: string): Promise<Record<string, any>> {
  const data = await groupCsvDataByDate(year);
  const totals: Record<string, any> = {};

  const excludedHeaders = ['latitude', 'longitude', 'geocode', 'timestamp', 'date'];

  data.forEach((row) => {
    const headers = Object.keys(row);

    headers.forEach((header) => {
      if (excludedHeaders.includes(header)) return;

      const headerValue = row[header];
      if (!isNaN(Number(headerValue))) {
        totals[header] = (totals[header] || 0) + Number(headerValue);
      } else {
        totals[header] = totals[header] || {};
        totals[header][headerValue] = (totals[header][headerValue] || 0) + 1;
      }
    });
  });

  return totals;
}