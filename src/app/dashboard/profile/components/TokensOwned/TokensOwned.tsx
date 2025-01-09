import React from 'react';
import { Box } from '@/components/Box';
import { TokensOwnedItem, TokensOwnedWrapper } from '@/app/dashboard/profile/components/TokensOwned/styles';
import { Absolute, FadeIn, Flex, Scrollable, Text } from '@/styles/global';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '@/config/constants';
import { Show } from '@/components/Show';
import { Separator } from '@/components/Separator';
import { useConfig } from '@/contexts/ConfigContext';
import { TokensOwnedProps } from './types';
import { ImageWithFallback } from '@/components/Image';
import { Formatter } from '@/utils';
import Image from 'next/image';
import { Loader } from '@/components/Loader';
import { ModalsType, useModal } from '@/contexts/ModalContext';
import { Button } from '@/components/Button';

export const TokensOwned: React.FC<TokensOwnedProps> = ({ tokens, isLoading }) => {
    const config = useConfig();
    const [showMemes] = useLocalStorage(LOCAL_STORAGE_KEYS.SHOW_MEMES);

    const { showModal } = useModal();

    return (
        <Box padding="30px 5px 30px 40px" overflow="none">
            <TokensOwnedWrapper>
                <Flex alignItems="center" justifyContent="center" paddingBottom="21px">
                    <Text fontSize="28px">Tokens owned</Text>
                </Flex>

                <Show.When isTrue={isLoading}>
                    <Flex alignItems="center" justifyContent="center">
                        <Loader.Dots color={config.theme.accent} />
                    </Flex>
                </Show.When>

                <Show.When isTrue={!isLoading && !!tokens.length}>
                    <FadeIn>
                        <Scrollable>
                            <Flex flexDirection="column" height="100%" width="100%" gap={21}>
                                {tokens?.map((token, index) => (
                                    <TokensOwnedItem key={index} available={token.isAvailable}>
                                        <Flex alignItems="center">
                                            <ImageWithFallback src={token.imageUrl} size={24} radius="50%" />
                                            <Text fontSize="20px">{token.name}</Text>
                                        </Flex>

                                        <Flex flexDirection="column" alignItems={!!token.migrationAddress ? 'center' : 'flex-end'} gap={0}>
                                            <Text fontSize="20px" lineHeight="1">
                                                {Formatter.formatNumber(token.balance)}
                                            </Text>
                                            <Text fontSize="16px" lineHeight="1" color={config.theme.gray}>
                                                ${Formatter.formatNumber(token.balanceUsd)}
                                            </Text>
                                        </Flex>

                                        <Show.When isTrue={!!token.migrationAddress}>
                                            <Show.When isTrue={!!token.migrationBalance}>
                                                <Button.Secondary width="100px" height="34px">
                                                    Trade
                                                </Button.Secondary>
                                            </Show.When>

                                            <Show.When isTrue={!token.migrationBalance}>
                                                <Button.Secondary width="100px" height="34px" onClick={() => showModal(ModalsType.migrate, token.address)}>
                                                    Migrate
                                                </Button.Secondary>
                                            </Show.When>
                                        </Show.When>
                                    </TokensOwnedItem>
                                ))}
                            </Flex>
                        </Scrollable>
                    </FadeIn>
                </Show.When>

                <Show.When isTrue={!isLoading && !tokens.length}>
                    <FadeIn>
                        <Flex flexDirection="column" justifyContent="center" height="100%" paddingRight="35px">
                            <Flex flexDirection="column" width="100%" justifyContent="center" alignItems="center" gap={0}>
                                <Image src="/img/memes/frog-07.svg" alt="" width={163} height={163} />
                                <Flex padding="0 30px" width="100%">
                                    <Separator color={config.theme.accent} />
                                </Flex>
                            </Flex>

                            <Flex justifyContent="center">
                                <Text fontSize="24px" color={config.theme.gray}>
                                    You don`t have any tokens yet
                                </Text>
                            </Flex>
                        </Flex>
                    </FadeIn>
                </Show.When>
            </TokensOwnedWrapper>

            <Show.When isTrue={showMemes}>
                <Absolute top="40%" left="-22px">
                    <Image src="/img/memes/frog-hand-01.svg" alt="" width={50} height={57} />
                </Absolute>
            </Show.When>
        </Box>
    );
};
