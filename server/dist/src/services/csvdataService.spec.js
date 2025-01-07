"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var csvdataService_1 = require("./csvdataService");
var readCsvService = __importStar(require("./readCsvService"));
jest.mock('./readCsvService');
describe('CSV Data Service', function () {
    beforeEach(function () {
        jest.clearAllMocks();
    });
    describe('groupCsvDataByDate', function () {
        it('should group markers by year', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockData, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockData = [
                            { geocode: [10.0, 20.0], timestamp: '2024-01-01' },
                            { geocode: [30.0, 40.0], timestamp: '2024-01-05' },
                            { geocode: [50.0, 60.0], timestamp: '2023-01-01' },
                        ];
                        readCsvService.getCachedCSVData.mockResolvedValue(mockData);
                        return [4 /*yield*/, (0, csvdataService_1.groupCsvDataByDate)('2024')];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([
                            { geocode: [10.0, 20.0], timestamp: '2024-01-01' },
                            { geocode: [30.0, 40.0], timestamp: '2024-01-05' },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return an empty array for a year with no data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockData, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockData = [
                            { geocode: [10.0, 20.0], timestamp: '2023-01-01' },
                            { geocode: [10.0, 20.0], timestamp: '2020-01-01' },
                            { geocode: [10.0, 20.0], timestamp: '2021-01-01' },
                        ];
                        readCsvService.getCachedCSVData.mockResolvedValue(mockData);
                        return [4 /*yield*/, (0, csvdataService_1.groupCsvDataByDate)('2024')];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle markers without a timestamp', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockData, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockData = [
                            { geocode: [10.0, 20.0] },
                            { geocode: [30.0, 40.0], timestamp: '2024-01-05' },
                        ];
                        readCsvService.getCachedCSVData.mockResolvedValue(mockData);
                        return [4 /*yield*/, (0, csvdataService_1.groupCsvDataByDate)('2024')];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([
                            { geocode: [30.0, 40.0], timestamp: '2024-01-05' },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle markers with invalid timestamp formats', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockData, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockData = [
                            { geocode: [10.0, 20.0], timestamp: 'invalid-date' },
                            { geocode: [30.0, 40.0], timestamp: '2024-01-05' },
                        ];
                        readCsvService.getCachedCSVData.mockResolvedValue(mockData);
                        return [4 /*yield*/, (0, csvdataService_1.groupCsvDataByDate)('2024')];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([{ geocode: [30.0, 40.0], timestamp: '2024-01-05' }]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('groupCSVByTotalAmounts', function () {
        it('should calculate total amounts correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockData, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockData = [
                            { geocode: [10.0, 20.0], timestamp: '2024-01-01', amount: '100', species: '1' },
                            { geocode: [30.0, 40.0], timestamp: '2024-01-05', amount: '200', species: '1' },
                            { geocode: [50.0, 60.0], timestamp: '2023-01-01', amount: '50', species: '3' },
                        ];
                        readCsvService.getCachedCSVData.mockResolvedValue(mockData);
                        return [4 /*yield*/, (0, csvdataService_1.groupCSVByTotalAmounts)('2024')];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            amount: 300,
                            species: 2
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return an empty object for a year with no data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockData, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockData = [
                            { geocode: [10.0, 20.0], timestamp: '2023-01-01', amount: '50' },
                            { geocode: [30.0, 40.0], timestamp: '2024-01-05', amount: '200' },
                            { geocode: [50.0, 60.0], timestamp: '2023-06-07', amount: '560' },
                        ];
                        readCsvService.getCachedCSVData.mockResolvedValue(mockData);
                        return [4 /*yield*/, (0, csvdataService_1.groupCSVByTotalAmounts)('2019')];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({});
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle non-numeric fields correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockData, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockData = [
                            { geocode: [10.0, 20.0], timestamp: '2024-01-01', amount: '100', category: 'A' },
                            { geocode: [30.0, 40.0], timestamp: '2019-01-05', amount: '200', category: 'A' },
                            { geocode: [50.0, 60.0], timestamp: '2019-01-01', amount: '50', category: 'B' },
                            { geocode: [50.0, 60.0], timestamp: '2019-01-01', amount: '50', category: 'A' },
                        ];
                        readCsvService.getCachedCSVData.mockResolvedValue(mockData);
                        return [4 /*yield*/, (0, csvdataService_1.groupCSVByTotalAmounts)('2019')];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            amount: 300,
                            category: { 'A': 2, 'B': 1 },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
