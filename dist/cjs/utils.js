"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareData = exports.getTranslatedText = exports.getTextMeta = void 0;
var getTextMeta = function (text) {
    var abbreviations = Array.from(text.matchAll(/<(.*?)>/g), function (m) { return m[1]; });
    var comments = Array.from(text.matchAll(/\[(.*?)\]/g), function (m) { return m[1]; });
    var optionalData = Array.from(text.matchAll(/\((.*?)\)/g), function (m) { return m[1]; });
    var wordClassDefinitions = Array.from(text.matchAll(/\{(.*?)\}/g), function (m) { return m[1]; });
    return { abbreviations: abbreviations, comments: comments, optionalData: optionalData, wordClassDefinitions: wordClassDefinitions };
};
exports.getTextMeta = getTextMeta;
var getTranslatedText = function (text) {
    return text
        .replace(/\d|\[.+\]|<.+>|\{.+\}|\(.+\)/g, '')
        .trim();
};
exports.getTranslatedText = getTranslatedText;
var prepareData = function (from, to) {
    return from.map(function (element, index) { return ({
        translateFrom: element,
        translateTo: to[index],
    }); });
};
exports.prepareData = prepareData;
