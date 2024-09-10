export const uploadCSV = async (formData: any) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/csvdata/upload-csv`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error uploading file:', err);
    }
}


