import { Languages } from './config';
export declare type Translation = {
    text: string;
    meta: string[] | undefined;
};
export declare type TranslationResult = {
    translateFrom: Translation;
    translateTo: Translation;
};
export declare type TranslationInput = {
    fromLang: Languages;
    toLang: Languages;
    term: string;
};
