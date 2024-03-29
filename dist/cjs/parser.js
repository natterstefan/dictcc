"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTranslationsAudioUrls = exports.getTranslationsColumns = exports.getTranslationsIds = exports.getTranslationsArray = exports.getHtmlString = exports.createDictccUrl = void 0;
var tslib_1 = require("tslib");
var cheerio_1 = tslib_1.__importDefault(require("cheerio"));
var node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
var utils_1 = require("./utils");
var createDictccUrl = function (_a) {
    var sourceLanguage = _a.sourceLanguage, targetLanguage = _a.targetLanguage, term = _a.term;
    var url = new URL("https://".concat(sourceLanguage).concat(targetLanguage, ".dict.cc"));
    url.searchParams.set('s', term);
    return url.href;
};
exports.createDictccUrl = createDictccUrl;
var getHtmlString = function (url) { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4, (0, node_fetch_1.default)(url)];
        case 1: return [2, (_a.sent()).text()];
    }
}); }); };
exports.getHtmlString = getHtmlString;
var getTranslationsArray = function (html) {
    return Array.from(html.matchAll(/var c[\d]Arr = new Array\((.*)\);/g), function (m) { return m[1]; }).map(function (language) { return JSON.parse("[".concat(language.replaceAll("\\'", "'"), "]")); });
};
exports.getTranslationsArray = getTranslationsArray;
var getTranslationsIds = function (html) {
    var _a;
    return ((_a = Array.from(html.matchAll(/var idArr = new Array\((.*)\);/g), function (m) { return m[1]; }).map(function (translationId) { return JSON.parse("[".concat(translationId.replaceAll("\\'", "'"), "]")); })[0]) !== null && _a !== void 0 ? _a : []).slice(1);
};
exports.getTranslationsIds = getTranslationsIds;
var getTranslationsColumns = function (html) {
    var $ = cheerio_1.default.load(html);
    var translationsLeft = [];
    var translationsRight = [];
    $('td.td7nl').each(function (i, elem) {
        $(elem)
            .find('dfn')
            .each(function (_i, el) {
            $(el).remove();
        });
        var rawText = $(elem).text();
        var text = (0, utils_1.getTranslatedText)(rawText);
        var meta = (0, utils_1.getTextMeta)(rawText);
        if (i % 2 === 0) {
            translationsRight.push({ text: text, meta: meta });
        }
        else {
            translationsLeft.push({ text: text, meta: meta });
        }
    });
    return {
        translationsLeft: translationsLeft,
        translationsRight: translationsRight,
    };
};
exports.getTranslationsColumns = getTranslationsColumns;
var getTranslationsAudioUrls = function (translationsIds, sourceLanguage, targetLanguage) {
    return translationsIds.map(function (translationId) {
        return "https://audio.dict.cc/speak.audio.v2.php?type=mp3&id=".concat(translationId, "&lang=").concat(targetLanguage, "_rec_ip&lp=").concat(sourceLanguage.toUpperCase()).concat(targetLanguage.toUpperCase());
    });
};
exports.getTranslationsAudioUrls = getTranslationsAudioUrls;
