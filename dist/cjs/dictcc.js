"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var cheerio_1 = tslib_1.__importDefault(require("cheerio"));
var node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
var config_1 = require("./config");
var utils_1 = require("./utils");
exports.default = (function (_a) {
    var fromLang = _a.fromLang, toLang = _a.toLang, term = _a.term;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var url, response, body, $_1, translateFrom_1, translateTo_1, error_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!config_1.Languages[fromLang] || !config_1.Languages[toLang]) {
                        return [2, {
                                data: undefined,
                                error: new Error("Either ".concat(fromLang, " or ").concat(toLang, " value is not supported!")),
                            }];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    url = (0, utils_1.getDictccUrl)({ fromLang: fromLang, toLang: toLang, term: term });
                    return [4, (0, node_fetch_1.default)(url)];
                case 2:
                    response = _b.sent();
                    return [4, response.text()];
                case 3:
                    body = _b.sent();
                    $_1 = cheerio_1.default.load(body);
                    translateFrom_1 = [];
                    translateTo_1 = [];
                    $_1('td.td7nl').each(function (i, elem) {
                        var rawText = $_1(elem).text();
                        var text = (0, utils_1.getTranslatedText)(rawText);
                        var meta = (0, utils_1.getTextMeta)(rawText);
                        if (i % 2 === 0) {
                            translateTo_1.push({ text: text, meta: meta });
                        }
                        else {
                            translateFrom_1.push({ text: text, meta: meta });
                        }
                    });
                    return [2, {
                            data: translateFrom_1.map(function (element, index) { return ({
                                translateFrom: element,
                                translateTo: translateTo_1[index],
                            }); }),
                            error: undefined,
                        }];
                case 4:
                    error_1 = _b.sent();
                    if (error_1 instanceof Error) {
                        return [2, {
                                data: undefined,
                                error: error_1,
                            }];
                    }
                    return [3, 5];
                case 5: return [2, {
                        data: undefined,
                        error: new Error('Unknown error'),
                    }];
            }
        });
    });
});
