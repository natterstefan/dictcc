import { Translation, TranslationInput } from './types';
export declare const createDictccUrl: ({ sourceLanguage, targetLanguage, term, }: TranslationInput) => string;
export declare const getHtmlString: (url: string) => Promise<string>;
export declare const getTranslationsArray: (html: string) => (string[] | undefined)[];
export declare const getTranslationsIds: (html: string) => string[];
export declare const getTranslationsColumns: (html: string) => {
    translationsLeft: Translation[];
    translationsRight: Translation[];
};
export declare const getTranslationsAudioUrls: (translationsIds: string[], sourceLanguage: string, targetLanguage: string) => string[];
