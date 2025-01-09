import React, { useMemo } from 'react';
import { RangeSlider, RangeSliderValue, RangeWrapper } from '@/components/Range/styles';
import { Flex, Text } from '@/styles/global';
import { useConfig } from '@/contexts/ConfigContext';
import { RangeSliderProps } from '@/components/Range/types';
import { Formatter } from '@/utils';
import { Show } from '@/components/Show';
import { MIN_PARTICIPANTS } from '@/config/constants';

export const Range: React.FC<RangeSliderProps> = ({ pollingToken }) => {
    const config = useConfig();

    const maxValue = useMemo(() => {
        if (typeof pollingToken === 'undefined') return 0;
        const index = Formatter.getThresholdIndex(pollingToken);
        return Formatter.getThresholdByIndex(index);
    }, [pollingToken]);

    const minValue = useMemo(() => {
        if (typeof pollingToken === 'undefined') return 0;
        const index = Formatter.getThresholdIndex(pollingToken);
        return index > 0 ? Formatter.getThresholdByIndex(index - 2) : 0;
    }, [pollingToken]);

    const percent = useMemo(() => {
        if (!pollingToken || !maxValue) return 0;
        const _percent = (pollingToken / maxValue) * 100;
        if (_percent > 100) return 100;
        return _percent;
    }, [pollingToken, maxValue]);

    return (
        <RangeWrapper>
            <RangeSlider percent={percent} value={pollingToken}>
                <RangeSliderValue></RangeSliderValue>
            </RangeSlider>

            <Flex justifyContent="space-between">
                <Text fontSize="18px" color={config.theme.gray}>
                    {minValue || 0}
                </Text>
                <Show.When isTrue={maxValue > MIN_PARTICIPANTS}>
                    <Text fontSize="18px" color={config.theme.gray}>
                        {maxValue / 2}
                    </Text>
                </Show.When>
                <Text fontSize="18px" color={config.theme.gray}>
                    {maxValue}
                </Text>
            </Flex>
        </RangeWrapper>
    );
};
