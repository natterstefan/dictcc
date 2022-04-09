import { Translation, TranslationInput } from './types';
export declare const createDictccUrl: ({ sourceLanguage, targetLanguage, term, }: TranslationInput) => string;
export declare const getHtmlString: (input: TranslationInput) => Promise<string>;
export declare const getTranslationsArray: (html: string) => (string[] | undefined)[];
export declare const getTranslationsColumns: (html: string) => {
    translationsLeft: Translation[];
    translationsRight: Translation[];
};
