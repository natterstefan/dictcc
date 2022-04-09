"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTranslationsColumns = exports.getTranslationsArray = exports.getHtmlString = exports.createDictccUrl = void 0;
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
var getHtmlString = function (input) { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4, (0, node_fetch_1.default)((0, exports.createDictccUrl)(input))];
        case 1: return [2, (_a.sent()).text()];
    }
}); }); };
exports.getHtmlString = getHtmlString;
var getTranslationsArray = function (html) {
    return Array.from(html.matchAll(/var c[\d]Arr = new Array\((.*)\);/g), function (m) { return m[1]; }).map(function (language) { return JSON.parse("[".concat(language.replaceAll("\\'", "'"), "]")); });
};
exports.getTranslationsArray = getTranslationsArray;
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
