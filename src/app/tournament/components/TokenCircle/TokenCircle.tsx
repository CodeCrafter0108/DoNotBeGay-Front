import React, { useMemo, useState } from 'react';
import { Absolute, FadeIn, Flex, Grid, Text } from '@/styles/global';
import { Formatter } from '@/utils';
import { ShowType, TokenCircleProps } from './types';

import { Show } from '@/components/Show';
import { Box } from '@/components/Box';

import { Circle } from './Circle';
import { List } from './List';
import Image from 'next/image';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '@/config/constants';
import { Loader } from '@/components/Loader';

export const TokenCircle: React.FC<TokenCircleProps> = ({ tokens, isLoading, onSelect }) => {
    const [showMemes] = useLocalStorage(LOCAL_STORAGE_KEYS.SHOW_MEMES);
    const [showType] = useState<ShowType>(ShowType.LIST);

    const availableTokens = useMemo(() => {
        if (!tokens) return [];
        return tokens.filter((token) => token.isAvailable);
    }, [tokens]);

    const totalBalanceUsd = useMemo(() => {
        if (!availableTokens) return 0;
        return availableTokens.reduce((acc, token) => acc + Number(token.balanceUsd), 0);
    }, [availableTokens]);

    return (
        <Box>
            <Flex flexDirection="column" gap={12} height="100%">
                {/* Title */}
                <Flex justifyContent="space-between">
                    <Flex flexDirection="column" gap={0}>
                        <Text fontSize="28px">You`ve got</Text>
                        <Text fontSize="28px" lineHeight="1">
                            ${Formatter.formatNumber(totalBalanceUsd)}
                        </Text>
                    </Flex>

                    <Show.When isTrue={showMemes}>
                        <Absolute right="-32px">
                            <Image src="/img/memes/frog-02.svg" alt="" width={111} height={80} />
                        </Absolute>
                    </Show.When>
                </Flex>

                {/* Circle */}
                <Show.When isTrue={showType === ShowType.CIRCLE}>
                    <FadeIn>
                        <Circle />
                    </FadeIn>
                </Show.When>

                {/* List */}
                <Show.When isTrue={showType === ShowType.LIST}>
                    <Show.When isTrue={!isLoading}>
                        <FadeIn>
                            <List tokens={tokens} onSelect={onSelect} />
                        </FadeIn>
                    </Show.When>

                    <Show.When isTrue={isLoading}>
                        <Grid gap={20} paddingTop="35px">
                            <Loader.Skeleton height="26px" width="100%" />
                            <Loader.Skeleton height="26px" width="100%" />
                            <Loader.Skeleton height="26px" width="100%" />
                            <Loader.Skeleton height="26px" width="100%" />
                            <Loader.Skeleton height="26px" width="100%" />
                            <Loader.Skeleton height="26px" width="100%" />
                            <Loader.Skeleton height="26px" width="100%" />
                        </Grid>
                    </Show.When>
                </Show.When>
            </Flex>
        </Box>
    );
};
