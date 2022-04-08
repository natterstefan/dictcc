import { __awaiter, __generator } from "tslib";
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { Languages } from './config';
import { getDictccUrl, getTextMeta, getTranslatedText } from './utils';
export default (function (_a) {
    var fromLang = _a.fromLang, toLang = _a.toLang, term = _a.term;
    return __awaiter(void 0, void 0, void 0, function () {
        var url, response, body, $_1, translateFrom_1, translateTo_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!Languages[fromLang] || !Languages[toLang]) {
                        return [2, {
                                data: undefined,
                                error: new Error("Either ".concat(fromLang, " or ").concat(toLang, " value is not supported!")),
                            }];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    url = getDictccUrl({ fromLang: fromLang, toLang: toLang, term: term });
                    return [4, fetch(url)];
                case 2:
                    response = _b.sent();
                    return [4, response.text()];
                case 3:
                    body = _b.sent();
                    $_1 = cheerio.load(body);
                    translateFrom_1 = [];
                    translateTo_1 = [];
                    $_1('td.td7nl').each(function (i, elem) {
                        var rawText = $_1(elem).text();
                        var text = getTranslatedText(rawText);
                        var meta = getTextMeta(rawText);
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
