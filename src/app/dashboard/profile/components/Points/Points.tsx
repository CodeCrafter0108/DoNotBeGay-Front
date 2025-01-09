'use client';

import React, { useMemo } from 'react';
import { Box } from '@/components/Box';
import { PointsHeaderWrapper, PointsWrapper, PointsWrapperHeaderItem, PointsWrapperItem } from '@/app/dashboard/profile/components/Points/styles';
import { Absolute, Flex, Grid, Text } from '@/styles/global';
import Image from 'next/image';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '@/config/constants';
import { PointsProps } from './types';
import { Formatter } from '@/utils';

const MAX = 1_000_000;

export const Points: React.FC<PointsProps> = ({ points }) => {
    const [showMemes] = useLocalStorage(LOCAL_STORAGE_KEYS.SHOW_MEMES);

    const percent = useMemo(() => {
        if (!points || !points.total) return 0;
        return (points.total / MAX) * 100;
    }, [points]);

    const isIndexActive = (index: number) => {
        return index <= percent / 10;
    };

    const getPercentByIndex = (index: number) => {
        return 100 - index * 10;
    };

    return (
        <Box height="200px" padding="30px 40px">
            <Flex alignItems="center" justifyContent="center" paddingBottom="21px">
                <Text fontSize="28px">Points: {Formatter.formatNumber(points?.total)}</Text>
            </Flex>

            <Grid gap={10}>
                <PointsHeaderWrapper>
                    {Array.from({ length: 11 }).map((_, index) => (
                        <PointsWrapperHeaderItem key={index} active={index === Math.floor(percent / 10)}>
                            <span>{getPercentByIndex(index)}%</span>
                            <span>gay</span>
                        </PointsWrapperHeaderItem>
                    ))}
                </PointsHeaderWrapper>

                <PointsWrapper>
                    {Array.from({ length: 11 }).map((_, index) => (
                        <PointsWrapperItem key={index} active={isIndexActive(index)}>
                            {Formatter.abbreviateNumber(index * 100_000)}
                        </PointsWrapperItem>
                    ))}
                </PointsWrapper>

                {showMemes && (
                    <>
                        <Absolute top="-49px" left="10px">
                            <Image src="/img/memes/dog-01.svg" alt="" width={85} height={109} />
                        </Absolute>

                        <Absolute top="-48px" right="10px">
                            <Image src="/img/memes/dog-02.svg" alt="" width={85} height={109} />
                        </Absolute>
                    </>
                )}
            </Grid>
        </Box>
    );
};
