import { __awaiter, __generator } from "tslib";
import { Languages } from './languages';
import { getHtmlString, getTranslationsColumns, getTranslationsArray, } from './parser';
import { prepareData } from './utils';
export default (function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var sourceLanguage, targetLanguage, term, body, translations, _a, translationsLeft, translationsRight, data, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sourceLanguage = input.sourceLanguage, targetLanguage = input.targetLanguage, term = input.term;
                if (!Languages[sourceLanguage] || !Languages[targetLanguage]) {
                    return [2, {
                            data: undefined,
                            error: new Error("The language ".concat(sourceLanguage, " or ").concat(targetLanguage, " is not supported!")),
                        }];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4, getHtmlString(input)];
            case 2:
                body = _b.sent();
                translations = getTranslationsArray(body);
                if (!translations[0] || !translations[1]) {
                    return [2, {
                            data: [],
                            error: undefined,
                        }];
                }
                _a = getTranslationsColumns(body), translationsLeft = _a.translationsLeft, translationsRight = _a.translationsRight;
                data = void 0;
                if (translations[0].includes(term)) {
                    data = prepareData(translationsRight, translationsLeft);
                }
                else {
                    data = prepareData(translationsLeft, translationsRight);
                }
                return [2, {
                        data: data,
                        error: undefined,
                    }];
            case 3:
                error_1 = _b.sent();
                if (error_1 instanceof Error) {
                    return [2, {
                            data: undefined,
                            error: error_1,
                        }];
                }
                return [3, 4];
            case 4: return [2, {
                    data: undefined,
                    error: new Error('Unknown error'),
                }];
        }
    });
}); });
