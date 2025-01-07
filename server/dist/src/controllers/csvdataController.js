"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupedDataByTotalAmounts = exports.getGroupedDataByYear = exports.uploadCsvData = void 0;
var readCsvService_1 = require("../services/readCsvService");
var csvdataService_1 = require("../services/csvdataService");
var path_1 = __importDefault(require("path"));
var uploadCsvData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentYear, defaultFilePath, dataYear, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentYear = new Date().getFullYear().toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                if (!(!req.file || !req.file.buffer)) return [3 /*break*/, 2];
                console.log('No file uploaded, using the default CSV.');
                defaultFilePath = path_1.default.join(__dirname, '../data/data-birds.csv');
                (0, readCsvService_1.setNewCSVFileToCache)(defaultFilePath);
                return [3 /*break*/, 4];
            case 2:
                console.log('CSV file uploaded and processed from buffer.');
                return [4 /*yield*/, (0, readCsvService_1.parseCSVFromBuffer)(req.file.buffer)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, (0, csvdataService_1.groupCsvDataByDate)(currentYear)];
            case 5:
                dataYear = _a.sent();
                return [4 /*yield*/, (0, csvdataService_1.groupCSVByTotalAmounts)(currentYear)];
            case 6:
                _a.sent();
                res.json(dataYear);
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.error('Error processing CSV data:', error_1);
                res.status(500).send('Error processing CSV data');
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.uploadCsvData = uploadCsvData;
var getGroupedDataByYear = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentYear, year, groupedData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentYear = new Date().getFullYear().toString();
                year = req.params.year || currentYear;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, csvdataService_1.groupCsvDataByDate)(year)];
            case 2:
                groupedData = _a.sent();
                res.json(groupedData);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).send('Error grouping data by date');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getGroupedDataByYear = getGroupedDataByYear;
var getGroupedDataByTotalAmounts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentYear, year, groupedData, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentYear = new Date().getFullYear().toString();
                year = req.params.year || currentYear;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, csvdataService_1.groupCSVByTotalAmounts)(year)];
            case 2:
                groupedData = _a.sent();
                res.json(groupedData);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).send('Error grouping data by total amounts per year');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getGroupedDataByTotalAmounts = getGroupedDataByTotalAmounts;
