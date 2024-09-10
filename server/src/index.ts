import express from 'express';
import cors from 'cors';
import multer from 'multer'
import { getGroupedDataByYear, getGroupedDataByTotalAmounts, uploadCsvData } from './controllers/csvdataController';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

router.post('/csvdata/upload-csv', upload.single('file'), uploadCsvData);

router.get('/csvdata/:year', getGroupedDataByYear);
router.get('/csvdata/total-amounts/:year', getGroupedDataByTotalAmounts);

app.use('/api', router);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
