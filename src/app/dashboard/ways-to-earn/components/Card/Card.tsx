import React from 'react';
import { CardWrapper } from './styles';
import { Button } from '@/components/Button';
import { Absolute, Flex, Text } from '@/styles/global';
import { Box } from '@/components/Box';
import { useConfig } from '@/contexts/ConfigContext';
import Image from 'next/image';

export const Card = () => {
    const { theme } = useConfig();

    return (
        <CardWrapper>
            <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize="28px" lineHeight="28px">
                    Tokens owned
                </Text>

                <Box pixelatedCorners={['bottomLeft', 'bottomRight', 'topLeft', 'topRight']} backgroundColor={theme.green} padding="6px 25px">
                    5x points
                </Box>

                <Absolute right="87px" bottom="8px">
                    <Image src="/img/icons/line.svg" alt="" width={10} height={50} />
                </Absolute>
                <Absolute right="12px" bottom="8px">
                    <Image src="/img/icons/line.svg" alt="" width={10} height={50} />
                </Absolute>
            </Flex>
            <Text fontSize="18px" lineHeight="18px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit{' '}
            </Text>
            <Button.Secondary width="100%">Lorem ipsum dolor sit amet</Button.Secondary>
        </CardWrapper>
    );
};
