import { IToken } from '@/types/tournament';

export enum SlippageType {
    AUTO = 'auto',
    PRESET_05 = 'preset_05',
    PRESET_1 = 'preset_1',
}

export interface TokenSwapProps {
    tokens?: IToken[];
    nativeToken?: IToken;
    onSwap: () => void;
    onApprove: () => void;
}

export interface TokenSlippageProps {
    slippage: number | SlippageType;
    onChange: (value: number | SlippageType) => void;
}

export enum TokenSwapProcessingType {
    SWAP,
    APPROVE,
}
