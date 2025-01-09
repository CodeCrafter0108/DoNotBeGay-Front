import React from 'react';
import {
    CurrencyWrapper,
    CurrencyWrapperBalance,
    CurrencyWrapperSelect,
    NumberWrapper,
    SearchWrapper,
    SlippageWrapper,
    TextWrapper,
    TokenWrapper,
    TokenWrapperBadge,
} from './styles';
import { CurrencyProps, InputType, Props, SlippageProps, TextProps, TokenProps } from './types';
import { Icon } from '@/components/Icon';
import { Absolute, Flex, Text } from '@/styles/global';
import { TokenSelect } from '@/components/TokenSelect/TokenSelect';
import { formatByVariant } from '@/components/Input/validator';
import { Formatter } from '@/utils';
import { AmountType } from '@/types';

const WrapperByVariant = {
    text: TextWrapper,
    link: TextWrapper,
    number: NumberWrapper,
    search: SearchWrapper,
    currency: CurrencyWrapper,
    token: TokenWrapper,
    slippage: SlippageWrapper,
};

const BaseInput: React.FC<Props> = ({ children, value, height, fontSize, padding, disabled, invalid, placeholder = '0.00', label, variant, onChange }) => {
    if (!variant) {
        console.error('Input variant is required');
        return;
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = formatByVariant(variant, e.target.value);
        onChange(value);
    };

    const Wrapper = WrapperByVariant[variant];

    return (
        <Wrapper disabled={disabled} invalid={invalid} height={height} fontSize={fontSize} padding={padding} variant={variant}>
            {label && <label>{label}</label>}

            <input type="text" value={value} onChange={handleOnChange} placeholder={placeholder} />

            {children}
        </Wrapper>
    );
};

const TextInput: React.FC<TextProps> = (props) => {
    const handleChange = (value: string) => {
        if (props.uppercase) {
            value = value.toUpperCase();
            props.onChange(value);
            return;
        }
        props.onChange(value);
    };

    return <BaseInput {...props} variant="text" onChange={handleChange} />;
};

const SearchInput: React.FC<Props> = (props) => {
    return (
        <BaseInput {...props}>
            <Absolute top="15px" left="15px">
                <Icon.Svg name="search" size={20} />
            </Absolute>
        </BaseInput>
    );
};

const CurrencyInput: React.FC<CurrencyProps> = ({ token, valueUsd, valueType, balance, selectable = true, onSelect, onMax, ...props }) => {
    const handleSelect = (valueType: AmountType) => {
        if (!onSelect || typeof valueType === 'undefined') return;
        onSelect(valueType);
    };

    const handleMax = () => {
        if (!onMax || typeof valueType === 'undefined') return;
        onMax(valueType);
    };

    return (
        <BaseInput {...props} variant="currency">
            <CurrencyWrapperBalance>
                <Flex alignItems="center">
                    <Text fontSize="14px" color="#ffffff60">
                        ${valueUsd}
                    </Text>
                </Flex>
            </CurrencyWrapperBalance>

            <CurrencyWrapperSelect>
                <TokenSelect token={token} valueType={valueType} selectable={selectable} onSelect={handleSelect} />
                <Flex gap={5} alignItems="center" justifyContent="flex-end" cursor="pointer" onClick={handleMax}>
                    <Icon.Svg name="wallet-small" size={16} />
                    <Text fontSize="14px" color="#ffffff60">
                        {Formatter.formatBalance(balance, 4) || '0.00'}
                    </Text>
                </Flex>
            </CurrencyWrapperSelect>
        </BaseInput>
    );
};

const TokenInput: React.FC<TokenProps> = ({ name, ...props }) => {
    return (
        <BaseInput {...props} variant="token">
            <TokenWrapperBadge>{name}</TokenWrapperBadge>
        </BaseInput>
    );
};

const SlippageInput: React.FC<SlippageProps> = ({ value, onChange }) => {
    return (
        <BaseInput variant="slippage" value={value} onChange={(value) => onChange(value)} placeholder="Custom %">
            <Text fontSize="14px" color="#ffffff60"></Text>
        </BaseInput>
    );
};

export const Input: InputType = {
    Text: (props) => <TextInput {...props} variant="text" />,
    Link: (props) => <BaseInput {...props} variant="link" />,
    Number: (props) => <BaseInput {...props} variant="number" />,
    Search: (props) => <SearchInput {...props} variant="search" />,
    Currency: (props) => <CurrencyInput {...props} variant="currency" />,
    Token: (props) => <TokenInput {...props} variant="token" />,
    Slippage: (props) => <SlippageInput {...props} variant="slippage" />,
};
