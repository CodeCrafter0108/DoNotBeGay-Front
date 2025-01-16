import { Address, formatUnits, parseUnits } from 'viem';
import { MAX_PARTICIPANTS } from '@/config/constants';
import { SlippageType } from '@/app/tournament/components/TokenSwap/types';

export type FormatType = undefined | string;

export class Formatter {
    static formatAddress = (address: Address | string | undefined) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    static genMinAmount = (digits: number): number => {
        if (digits < 1) return 1;
        return Number(`0.${''.padEnd(digits - 1, '0')}1`);
    };

    static formatPrice = (amount: number | undefined | null, digits: number = 3): FormatType => {
        let result: FormatType;

        if (amount !== undefined && amount !== null) {
            const minAmount: number = this.genMinAmount(digits);
            if (amount && amount < minAmount) {
                result = `<$${minAmount}`;
            } else {
                result = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: digits,
                    minimumFractionDigits: 0,
                }).format(amount);
            }
        }

        return result;
    };

    static formatNumber = (num: number | string | undefined, digits = 2) => {
        const _num = parseFloat(String(num));
        if (!_num || _num === 0) return '0.00';
        if (_num === 0) return '0.0';
        if (_num < 0.001) return '<0.001';
        return _num.toLocaleString('en-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: digits,
        });
    };

    static formatBalance = (num: number | string | undefined, digits = 2) => {
        const _num = parseFloat(String(num));
        if (!_num || _num === 0) return '0.00';
        if (_num === 0) return '0.0';
        return _num.toLocaleString('en-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: digits,
        });
    };

    static abbreviateNumber = (num: number | string | undefined, digits = 2) => {
        const _num = parseFloat(String(num));
        if (!_num || _num === 0) return '0';
        return new Intl.NumberFormat('en', {
            notation: 'compact',
            compactDisplay: 'short',
            maximumSignificantDigits: digits,
        }).format(_num);
    };

    static normalizeTimestamp = (timestamp: number) => {
        return timestamp * 1000;
    };

    static timestampToSeconds = (timestamp: number) => {
        return timestamp / 1000;
    };

    static getThresholdByIndex = (index: number) => {
        const thresholds = [8, 16, 32, 64, 128, 256];

        if (index >= thresholds.length) return thresholds[thresholds.length - 1];

        return thresholds[index];
    };

    static getThresholdIndex = (poolingToken: number) => {
        const thresholds = [8, 16, 32, 64, 128, 256];

        if (poolingToken >= MAX_PARTICIPANTS) return thresholds.length - 1;

        return thresholds.findIndex((threshold) => poolingToken < threshold);
    };

    static formatFileSize = (size: number) => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let unitIndex = 0;
        let formattedSize = size;

        while (formattedSize >= 1024 && unitIndex < units.length - 1) {
            formattedSize /= 1024;
            unitIndex++;
        }

        return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
    };

    static amountToBigint = (amount: string | number): bigint => {
        const _num = String(amount);
        if (!_num || _num === '0') return 0n;
        return parseUnits(_num.toString(), 18);
    };

    static bigintToAmount = (amount: bigint, decimals = 18): string => {
        return formatUnits(amount, decimals);
    };

    static amountWithSlippage = (amount: bigint, percent: number): bigint => {
        const slippage = BigInt(Math.floor(percent * 100));
        return slippage === 0n ? amount : amount - (amount * slippage) / 10000n;
    };

    static getSlippageTolerance = (slippage: SlippageType | number) => {
        switch (slippage) {
            case SlippageType.AUTO:
                return 0.25;
            case SlippageType.PRESET_05:
                return 0.5;
            case SlippageType.PRESET_1:
                return 1;
            default:
                return Math.floor(Number(slippage));
        }
    };
}
