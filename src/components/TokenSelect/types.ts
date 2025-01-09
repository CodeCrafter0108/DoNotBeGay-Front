import { AmountType } from '@/types';
import { IToken } from '@/types/tournament';
export interface TokenSelectProps {
    token?: IToken;
    valueType?: AmountType;
    selectable?: boolean;
    onSelect: (valueType: AmountType) => void;
}
