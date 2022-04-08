import { TranslationInput, TranslationResult } from './types';
declare const _default: ({ fromLang, toLang, term, }: TranslationInput) => Promise<{
    data: TranslationResult[] | undefined;
    error: Error | undefined;
}>;
export default _default;
