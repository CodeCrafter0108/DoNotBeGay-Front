import { ChainId } from '@/config/constants';
import { Address, Hex } from 'viem';

export interface FilePreSaveDto {
    chainId: ChainId;
    userAddress: Address;
    randomBytes: Hex;
    tournamentId: number;
    formData: FormData;
}

export interface FileSaveDto {
    randomBytes: Hex;
}

export interface HealthResponse {
    data: {
        status: 'ok' | 'error';
    };
}
