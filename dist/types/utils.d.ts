import { TranslationInput } from './types';
export declare const getTextMeta: (text: string) => string[] | undefined;
export declare const getTranslatedText: (text: string) => string;
export declare const getDictccUrl: ({ fromLang, toLang, term }: TranslationInput) => string;
