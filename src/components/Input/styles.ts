import styled from 'styled-components';
import { WrapperProps } from '@/components/Input/types';

const BaseWrapper = styled.div<WrapperProps>`
    width: 100%;
    height: 100%;
    min-height: ${({ height }) => height || '36px'};
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;

    color: ${({ theme }) => theme.white};
    border-radius: 12px;
    padding: ${({ padding }) => padding || '0'};

    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

    input {
        width: 100%;
        color: inherit;
        background: #323232;
        border: none;
        outline: none;
        font-weight: 400;
        font-size: ${({ fontSize }) => fontSize || '18px'};
        font-family: inherit;
        height: ${({ height }) => height || '48px'};
        padding: ${({ variant }) => (variant === 'search' ? '0 15px 0 45px' : '0 15px')};
        border-radius: inherit;
    }

    label {
        color: ${({ theme }) => theme.gray};
        font-size: 16px;
        padding-left: 8px;
    }
`;

export const TextWrapper = styled(BaseWrapper)<WrapperProps>`
    border: 1px solid ${({ invalid, theme }) => (invalid ? theme.red : 'transparent')};
`;

export const NumberWrapper = styled(BaseWrapper)<WrapperProps>`
    border: 1px solid ${({ invalid, theme }) => (invalid ? theme.red : 'transparent')};
`;

export const SearchWrapper = styled(BaseWrapper)<WrapperProps>`
    border: 1px solid ${({ invalid, theme }) => (invalid ? theme.red : 'transparent')};
`;

export const CurrencyWrapper = styled(BaseWrapper)<WrapperProps>`
    padding: 0;
    height: ${({ height }) => height || '48px'};
    background: #323232;

    input {
        height: 70%;
    }
`;

export const CurrencyWrapperSelect = styled.div`
    position: absolute;
    top: 8px;
    right: 16px;

    height: calc(100% - 16px);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
`;

export const CurrencyWrapperBalance = styled.div`
    position: absolute;
    bottom: 8px;
    left: 16px;
`;

export const TokenWrapper = styled(BaseWrapper)<WrapperProps>`
    position: relative;
    border: 1px solid ${({ invalid, theme }) => (invalid ? theme.red : 'transparent')};
`;

export const TokenWrapperBadge = styled.div`
    position: absolute;
    height: 32px;
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.bg};

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    border-radius: 4px;
    box-shadow: 2px 2px 0px 0px #0000008c;

    top: 29px;
    right: 12px;
`;

export const SlippageWrapper = styled.div`
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.accent};
    border: 1px solid ${({ theme }) => theme.accent};
    border-radius: 4px;

    width: 75px;

    input {
        width: 100%;
        height: 100%;
        background: transparent;
        outline: none;
        border: none;
        padding: 0 5px;
        color: ${({ theme }) => theme.accent};
        font-family: inherit;
        font-size: 16px;

        &::placeholder {
            color: ${({ theme }) => theme.accent};
        }
    }
`;
