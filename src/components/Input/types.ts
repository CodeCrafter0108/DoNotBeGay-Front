import { AmountType } from '@/types';
import { IToken } from '@/types/tournament';
import React from 'react';

export interface Props {
    children?: React.ReactNode;
    value?: string | number;
    height?: string;
    fontSize?: string;
    disabled?: boolean;
    padding?: string;
    invalid?: boolean;
    placeholder?: string;
    label?: string;
    variant?: InputVariant;
    onChange: (value: string) => void;
}

export type CurrencyProps = Props & {
    token?: IToken;
    valueType?: AmountType;
    valueUsd?: string;
    balance?: string;
    selectable?: boolean;
    onSelect?: (valueType: AmountType) => void;
    onMax?: (valueType: AmountType) => void;
};

export type TokenProps = Props & {
    name: string;
};

export type TextProps = Props & {
    uppercase?: boolean;
};

export type SlippageProps = Props & {
    value: number | string;
    onChange: (value: number) => void;
};

export type WrapperProps = Partial<Props>;

export type InputType = {
    Text: React.FC<TextProps>;
    Link: React.FC<Props>;
    Number: React.FC<Props>;
    Search: React.FC<Props>;
    Currency: React.FC<CurrencyProps>;
    Token: React.FC<TokenProps>;
    Slippage: React.FC<SlippageProps>;
};

export type InputVariant = 'text' | 'link' | 'number' | 'search' | 'currency' | 'token' | 'slippage';
