import { uploadCSV } from "./uploadCSV"

const mockEndpoint = process.env.REACT_APP_ENDPOINT = 'http://mockendpoint.com';

describe('uploadCSV', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should successfully upload CSV and return data', async () => {
        const mockResponse = { success: true, message: 'CSV uploaded successfully' };
        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        const formData = new FormData();
        formData.append('file', new Blob(['test content']), 'test.csv');

        const result = await uploadCSV(formData);

        expect(fetch).toHaveBeenCalledWith(
            `${mockEndpoint}/csvdata/upload-csv`,
            {
                method: 'POST',
                body: formData,
            }
        );

        expect(result).toEqual(mockResponse);
    });

    it('should throw an error when the network response is not ok', async () => {
        fetchMock.mockResponseOnce('', { status: 500 });

        const formData = new FormData();
        formData.append('file', new File(['test content'], 'test.csv', { type: 'text/csv' }));

        await expect(uploadCSV(formData)).rejects.toThrow('Failed to upload file. Please try again.');

        expect(fetch).toHaveBeenCalledWith(
            `${process.env.REACT_APP_ENDPOINT}/csvdata/upload-csv`,
            {
                method: 'POST',
                body: formData,
            }
        );
    });

    it('should log an error when an exception occurs', async () => {
        fetchMock.mockRejectOnce(new Error('fetch failed'));

        const formData = new FormData();
        formData.append('file', new File(['test content'], 'test.csv', { type: 'text/csv' }));


        await expect(uploadCSV(formData)).rejects.toThrow('Failed to upload file. Please try again.');


    });
});