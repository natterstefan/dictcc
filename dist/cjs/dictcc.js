"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var languages_1 = require("./languages");
var parser_1 = require("./parser");
var utils_1 = require("./utils");
exports.default = (function (input) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var sourceLanguage, targetLanguage, term, url, body, translations, translationsIds, _a, translationsLeft, translationsRight, audioUrls, data, error_1;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sourceLanguage = input.sourceLanguage, targetLanguage = input.targetLanguage, term = input.term;
                if (!languages_1.Languages[sourceLanguage] || !languages_1.Languages[targetLanguage]) {
                    return [2, {
                            data: undefined,
                            url: undefined,
                            error: new Error("The language ".concat(sourceLanguage, " or ").concat(targetLanguage, " is not supported!")),
                        }];
                }
                url = (0, parser_1.createDictccUrl)(input);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4, (0, parser_1.getHtmlString)(url)];
            case 2:
                body = _b.sent();
                translations = (0, parser_1.getTranslationsArray)(body);
                translationsIds = (0, parser_1.getTranslationsIds)(body);
                if (!translations[0] || !translations[1]) {
                    return [2, {
                            data: [],
                            url: url,
                            error: undefined,
                        }];
                }
                _a = (0, parser_1.getTranslationsColumns)(body), translationsLeft = _a.translationsLeft, translationsRight = _a.translationsRight;
                audioUrls = (0, parser_1.getTranslationsAudioUrls)(translationsIds, sourceLanguage, targetLanguage);
                data = void 0;
                if (translations[0].includes(term)) {
                    data = (0, utils_1.prepareData)(translationsRight, translationsLeft, audioUrls);
                }
                else {
                    data = (0, utils_1.prepareData)(translationsLeft, translationsRight, audioUrls);
                }
                return [2, {
                        data: data,
                        url: url,
                        error: undefined,
                    }];
            case 3:
                error_1 = _b.sent();
                if (error_1 instanceof Error) {
                    return [2, {
                            data: undefined,
                            url: url,
                            error: error_1,
                        }];
                }
                return [3, 4];
            case 4: return [2, {
                    data: undefined,
                    url: url,
                    error: new Error('Unknown error'),
                }];
        }
    });
}); });
