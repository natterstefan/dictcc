import { __awaiter, __generator } from "tslib";
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { getTextMeta, getTranslatedText } from './utils';
export var createDictccUrl = function (_a) {
    var sourceLanguage = _a.sourceLanguage, targetLanguage = _a.targetLanguage, term = _a.term;
    var url = new URL("https://".concat(sourceLanguage).concat(targetLanguage, ".dict.cc"));
    url.searchParams.set('s', term);
    return url.href;
};
export var getHtmlString = function (url) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4, fetch(url)];
        case 1: return [2, (_a.sent()).text()];
    }
}); }); };
export var getTranslationsArray = function (html) {
    return Array.from(html.matchAll(/var c[\d]Arr = new Array\((.*)\);/g), function (m) { return m[1]; }).map(function (language) { return JSON.parse("[".concat(language.replaceAll("\\'", "'"), "]")); });
};
export var getTranslationsIds = function (html) {
    var _a;
    return ((_a = Array.from(html.matchAll(/var idArr = new Array\((.*)\);/g), function (m) { return m[1]; }).map(function (translationId) { return JSON.parse("[".concat(translationId.replaceAll("\\'", "'"), "]")); })[0]) !== null && _a !== void 0 ? _a : []).slice(1);
};
export var getTranslationsColumns = function (html) {
    var $ = cheerio.load(html);
    var translationsLeft = [];
    var translationsRight = [];
    $('td.td7nl').each(function (i, elem) {
        $(elem)
            .find('dfn')
            .each(function (_i, el) {
            $(el).remove();
        });
        var rawText = $(elem).text();
        var text = getTranslatedText(rawText);
        var meta = getTextMeta(rawText);
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
export var getTranslationsAudioUrls = function (translationsIds, sourceLanguage, targetLanguage) {
    return translationsIds.map(function (translationId) {
        return "https://audio.dict.cc/speak.audio.v2.php?type=mp3&id=".concat(translationId, "&lang=").concat(targetLanguage, "_rec_ip&lp=").concat(sourceLanguage.toUpperCase()).concat(targetLanguage.toUpperCase());
    });
};
