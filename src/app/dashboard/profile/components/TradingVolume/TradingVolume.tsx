import React from 'react';
import { Absolute, Flex, Text } from '@/styles/global';
import { Box } from '@/components/Box';
import { useConfig } from '@/contexts/ConfigContext';
import { Icon } from '@/components/Icon';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '@/config/constants';
import { Show } from '@/components/Show';
import Image from 'next/image';
import { TradingVolumeProps } from '@/app/dashboard/profile/components/TradingVolume/types';
import { Formatter } from '@/utils';

export const TradingVolume: React.FC<TradingVolumeProps> = ({ tradingVolume, rating }) => {
    const config = useConfig();
    const [showMemes] = useLocalStorage(LOCAL_STORAGE_KEYS.SHOW_MEMES);

    return (
        <Flex flexDirection="column" alignItems="flex-start" gap={18}>
            <Box width="100%" padding="30px 40px">
                <Flex flexDirection="column" alignItems="center">
                    <Text fontSize="28px">Trading volume</Text>
                    <Text fontSize="36px" color={config.theme.accent} lineHeight="1">
                        ${Formatter.formatNumber(tradingVolume)}
                    </Text>
                </Flex>
            </Box>

            <Box width="100%" padding="20px 40px" pixelatedCorners={['topLeft', 'topRight', 'bottomLeft', 'bottomRight']}>
                <Flex alignItems="center" justifyContent="center">
                    <Icon.Svg name="prize-accent" size={24} />
                    <Text fontSize="32px" color={config.theme.accent} lineHeight="1">
                        {rating}
                    </Text>
                </Flex>
            </Box>

            <Absolute top="122px" left="20px">
                <Image src="/img/icons/line.svg" alt="" width={14} height={67} />
            </Absolute>

            <Absolute top="122px" right="20px">
                <Image src="/img/icons/line.svg" alt="" width={14} height={67} />
            </Absolute>

            <Show.When isTrue={showMemes}>
                <Absolute left="-65%" bottom="-52px" zIndex={-1}>
                    <Image src="/img/memes/frog-06.svg" alt="" width={730} height={271} priority />
                </Absolute>
            </Show.When>
        </Flex>
    );
};
