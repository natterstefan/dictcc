import { TextMetaResult, Translation, Translations } from './types';
export declare const getTextMeta: (text: string) => TextMetaResult;
export declare const getTranslatedText: (text: string) => string;
export declare const prepareData: (from: Translation[], to: Translation[], audioUrls: string[]) => Translations[];
