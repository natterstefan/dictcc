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
export declare type TranslationInput = {
    sourceLanguage: Languages;
    targetLanguage: Languages;
    term: string;
};
export declare type Translations = {
    sourceTranslation: Translation;
    targetTranslation: Translation;
};
export declare type TranslationResult = {
    data: Translations[] | undefined;
    error: Error | undefined;
    url: string | undefined;
};
