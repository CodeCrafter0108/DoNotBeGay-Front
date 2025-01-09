import React, { useMemo } from 'react';
import { SlippageType, TokenSlippageProps } from './types';
import { SlippageWrapper } from './styles';
import { Flex, Text } from '@/styles/global';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export const TokenSlippage: React.FC<TokenSlippageProps> = ({ slippage, onChange }) => {
    const value = useMemo(() => {
        if (slippage === SlippageType.AUTO) return '';
        if (slippage === SlippageType.PRESET_05) return '';
        if (slippage === SlippageType.PRESET_1) return '';
        return slippage;
    }, [slippage]);

    const handleChange = (value: string | number) => {
        onChange(Number(value));
    };

    return (
        <SlippageWrapper>
            <Text fontSize="18px">Slippage tolerance</Text>

            <Flex>
                <Button.Secondary small active={slippage === SlippageType.PRESET_05} onClick={() => onChange(SlippageType.PRESET_05)}>
                    0.5 %
                </Button.Secondary>
                <Button.Secondary small active={slippage === SlippageType.PRESET_1} onClick={() => onChange(SlippageType.PRESET_1)}>
                    1 %
                </Button.Secondary>
                <Input.Slippage value={value} onChange={handleChange} />
                <Button.Secondary small active={slippage === SlippageType.AUTO} onClick={() => onChange(SlippageType.AUTO)}>
                    Auto
                </Button.Secondary>
            </Flex>
        </SlippageWrapper>
    );
};
