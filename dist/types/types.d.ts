import { Languages } from './languages';
export declare type TextMetaResult = {
    abbreviations: string[];
    comments: string[];
    optionalData: string[];
    wordClassDefinitions: string[];
};
export declare type Translation = {
    text: string;
    meta: TextMetaResult;
};
export declare type TranslationResult = {
    translateFrom: Translation;
    translateTo: Translation;
};
export declare type TranslationInput = {
    sourceLanguage: Languages;
    targetLanguage: Languages;
    term: string;
};
