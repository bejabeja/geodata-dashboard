"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCSVFile = exports.parseCSVFromBuffer = void 0;
exports.setNewCSVFileToCache = setNewCSVFileToCache;
exports.getCachedCSVData = getCachedCSVData;
var papaparse_1 = __importDefault(require("papaparse"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var cachedData = null;
var currentFilePath = null;
var defaultCsvFilePath = path_1.default.join(__dirname, '../data/data-birds.csv');
function setNewCSVFileToCache(filePath) {
    if (!fs_1.default.existsSync(filePath)) {
        throw new Error("The file at ".concat(filePath, " does not exist."));
    }
    currentFilePath = filePath;
    cachedData = null;
}
var parseCSVFromBuffer = function (buffer) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                papaparse_1.default.parse(buffer.toString('utf-8'), {
                    header: true,
                    skipEmptyLines: true,
                    complete: function (results) {
                        cachedData = results.data
                            .map(createMarkerData)
                            .filter(function (marker) { return marker !== null; });
                        resolve();
                    },
                    error: function (error) { return reject(new Error('Error parsing the CSV file from buffer: ' + error.message)); },
                });
            })];
    });
}); };
exports.parseCSVFromBuffer = parseCSVFromBuffer;
function getCachedCSVData() {
    return __awaiter(this, void 0, void 0, function () {
        var filePathToUse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!cachedData) return [3 /*break*/, 2];
                    filePathToUse = currentFilePath || defaultCsvFilePath;
                    return [4 /*yield*/, (0, exports.parseCSVFile)(filePathToUse)];
                case 1:
                    cachedData = _a.sent();
                    console.log('Data loaded and cached successfully.');
                    _a.label = 2;
                case 2: return [2 /*return*/, cachedData];
            }
        });
    });
}
var parseCSVFile = function (filePath) {
    return new Promise(function (resolve, reject) {
        try {
            var fileStream = fs_1.default.createReadStream(filePath);
            papaparse_1.default.parse(fileStream, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    var csvData = results.data
                        .map(createMarkerData)
                        .filter(function (marker) { return marker !== null; });
                    resolve(csvData);
                },
                error: function (error) { return reject(new Error('Error parsing the CSV file: ' + error.message)); },
            });
        }
        catch (err) {
            reject(new Error('Error reading the CSV file'));
        }
    });
};
exports.parseCSVFile = parseCSVFile;
function createMarkerData(row) {
    var latitude = parseFloat(row.latitude);
    var longitude = parseFloat(row.longitude);
    if (isNaN(latitude) || isNaN(longitude)) {
        return null;
    }
    var cleanedRow = removeEmptyFields(row);
    return __assign({ geocode: [latitude, longitude], timestamp: row.timestamp || row.date || null }, cleanedRow);
}
function removeEmptyFields(row) {
    return Object.keys(row).reduce(function (acc, key) {
        var value = row[key];
        if (value !== "" && value !== null && value !== undefined) {
            acc[key] = value;
        }
        return acc;
    }, {});
}
