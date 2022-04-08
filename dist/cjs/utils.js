"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDictccUrl = exports.getTranslatedText = exports.getTextMeta = void 0;
var removeBrackets = function (text) { return text.replace(/\[|\]|\{|\}/g, ''); };
var getTextMeta = function (text) {
    var _a;
    return (_a = text
        .match(/\[.+\]|\{.+\}/g)) === null || _a === void 0 ? void 0 : _a.map(function (t) {
        if (t.includes('] [')) {
            return t.split('] [').map(function (e) { return removeBrackets(e); });
        }
        return removeBrackets(t);
    }).flat();
};
exports.getTextMeta = getTextMeta;
var getTranslatedText = function (text) {
    return text
        .replace(/\d/g, '')
        .replace(/\[.+\]/g, '')
        .replace(/\{.+\}/g, '')
        .trim();
};
exports.getTranslatedText = getTranslatedText;
var getDictccUrl = function (_a) {
    var fromLang = _a.fromLang, toLang = _a.toLang, term = _a.term;
    var url = new URL("https://".concat(fromLang, "-").concat(toLang, ".dict.cc"));
    url.searchParams.set('s', term);
    return url.href;
};
exports.getDictccUrl = getDictccUrl;
