import React from 'react';
import { ModalMigrateSuccessProps } from '../types';
import { useConfig } from '@/contexts/ConfigContext';
import { Button } from '@/components/Button';
import { Grid, Flex, Text } from '@/styles/global';
import { ModalMigrateContent, ModalMigrateSuccessContent, ModalMigrateSuccessImages } from '../styles';
import { Formatter } from '@/utils';
import { ImageWithFallback } from '@/components/Image';
import Image from 'next/image';

export const ModalMigrateSuccess: React.FC<ModalMigrateSuccessProps> = ({ token, onCancel, onTrade }) => {
    const { theme } = useConfig();

    return (
        <ModalMigrateContent>
            <Text fontSize="28px" textAlign="center" lineHeight="1">
                Migrate successfully
            </Text>

            <ModalMigrateSuccessContent>
                <ModalMigrateSuccessImages>
                    <Image src="/img/memes/stars-01.svg" alt="" width={46} height={44} />
                    <Image src="/img/memes/frog-08.svg" alt="" width={124} height={110} />
                    <Image src="/img/memes/stars-02.svg" alt="" width={48} height={37} />
                </ModalMigrateSuccessImages>

                <Grid gap={10}>
                    <Flex alignItems="center" gap={5}>
                        <ImageWithFallback size={24} src={token?.imageUrl} radius="50%" />
                        <Text fontSize="24px" lineHeight="1">
                            {Formatter.formatNumber(token?.balance)}
                        </Text>
                    </Flex>
                    <Text color={theme.gray} lineHeight="1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in rep
                    </Text>
                </Grid>
            </ModalMigrateSuccessContent>

            {/* Actions */}
            <Flex justifyContent="space-between">
                <Button.Secondary width="120px" onClick={onCancel}>
                    Cancel
                </Button.Secondary>
                <Button.Primary width="120px" onClick={onTrade}>
                    Trade
                </Button.Primary>
            </Flex>
        </ModalMigrateContent>
    );
};
