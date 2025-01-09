import { MAX_INPUT_SYMBOLS } from '@/config/constants';

export type HttpsValidator = (value: string) => boolean;
export type SymbolsValidator = (value: string, min: number, max: number) => boolean;

export const countOfSymbolsValidator: SymbolsValidator = (value: string, min: number, max: number) => {
    if (!value) return false;
    return value.length >= min && value.length <= max;
};

export const websiteValidator: HttpsValidator = (value: string) => {
    if (!value) return false;
    // starts from https:// and ends with period (.)
    const regex = /^https:\/\/[a-zA-Z0-9.]+[.]/g;
    return regex.test(value) && countOfSymbolsValidator(value, 10, MAX_INPUT_SYMBOLS);
};
