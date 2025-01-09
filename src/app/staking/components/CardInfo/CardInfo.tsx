import React from 'react';
import { Flex, Grid, Text } from '@/styles/global';
import { Box } from '@/components/Box';
import { useConfig } from '@/contexts/ConfigContext';
import { Button } from '@/components/Button';
import { CardInfoProps } from './types';

export const CardInfo: React.FC<CardInfoProps> = ({ title, tokenName, rewards, onAction }) => {
    const { theme } = useConfig();

    return (
        <Box padding="30px 40px">
            <Grid>
                <Text fontSize="28px" textAlign="center" lineHeight="1">
                    {title}
                </Text>

                <Flex justifyContent="space-between">
                    <Text fontSize="28px" textAlign="center" lineHeight="1">
                        {tokenName}
                    </Text>

                    <Text fontSize="28px" textAlign="center" lineHeight="1" color={theme.accent}>
                        {rewards}
                    </Text>
                </Flex>

                <Text fontSize="18px" lineHeight="1" color={theme.gray}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>

                <Button.Secondary width="100%" onClick={onAction}>
                    Claim
                </Button.Secondary>
            </Grid>
        </Box>
    );
};
