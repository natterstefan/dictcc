import { TextMetaResult, Translation } from './types';
export declare const getTextMeta: (text: string) => TextMetaResult;
export declare const getTranslatedText: (text: string) => string;
export declare const prepareData: (from: Translation[], to: Translation[]) => {
    translateFrom: Translation;
    translateTo: Translation;
}[];
