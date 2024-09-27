export const uploadCSV = async (formData: any) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/csvdata/upload-csv`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload CSV. Network response was not ok.');
        }

        const data = await response.json();
        return data;
    } catch (err: any) {
        throw new Error(`Failed to upload file. Please try again.`);
    }
}