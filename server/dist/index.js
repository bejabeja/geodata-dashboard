"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var multer_1 = __importDefault(require("multer"));
var csvdataController_1 = require("./src/controllers/csvdataController");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var router = express_1.default.Router();
var upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
var corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
router.post('/csvdata/upload-csv', upload.single('file'), csvdataController_1.uploadCsvData);
router.get('/csvdata/:year', csvdataController_1.getGroupedDataByYear);
router.get('/csvdata/total-amounts/:year', csvdataController_1.getGroupedDataByTotalAmounts);
app.use('/api', router);
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log("Server is running on port:".concat(PORT));
});
exports.default = app;
