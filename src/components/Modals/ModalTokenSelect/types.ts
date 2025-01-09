import { AmountType } from '@/types';
import { IToken } from '@/types/tournament';

export interface ModalTokenSelectProps {
    tokens: IToken[];
    valueType: AmountType;
    onSelect: (valueType: AmountType, token: IToken) => void;
    onClose: () => void;
}

export interface ModalTokenSelectItemProps {
    isAvailable: boolean;
}
