import React from 'react';
import { LaunchInfoProps } from '@/app/launcher/components/Info/types';
import { BoxWrapperRow } from '@/app/styles';
import { Flex, Text } from '@/styles/global';
import { Tooltip } from '@/components/Tooltip';
import Image from 'next/image';
import { Show } from '@/components/Show';
import { Loader } from '@/components/Loader';
import { Range } from '@/components/Range';
import { Box } from '@/components/Box';
import { useConfig } from '@/contexts/ConfigContext';

export const Info: React.FC<LaunchInfoProps> = ({ launchpad }) => {
    const config = useConfig();

    return (
        <Box padding="0">
            <BoxWrapperRow>
                <Flex justifyContent="space-between">
                    <Text fontSize="18px" textAlign="center" lineHeight="1">
                        Hours before tournament:
                    </Text>
                    <Text fontSize="18px" textAlign="center" lineHeight="1">
                        0
                    </Text>
                </Flex>

                <Flex justifyContent="space-between">
                    <Flex gap={5} alignItems="center">
                        <Text fontSize="18px" textAlign="center" lineHeight="1">
                            Current threshold:
                        </Text>
                        <Tooltip>
                            <Tooltip.Wrapper>
                                <Image src="/img/icons/info.svg" alt="" width={20} height={20} />
                            </Tooltip.Wrapper>
                            <Tooltip.Content>some tooltip</Tooltip.Content>
                        </Tooltip>
                    </Flex>

                    <Show>
                        <Show.When isTrue={!launchpad}>
                            <Loader.Skeleton width="60px" height="18px" />
                        </Show.When>
                        <Show.Else>
                            <Text fontSize="18px" textAlign="center" lineHeight="1">
                                {launchpad?.currentThreshold}
                            </Text>
                        </Show.Else>
                    </Show>
                </Flex>

                <Flex flexDirection="column" alignItems="flex-start" gap={20}>
                    <Flex justifyContent="space-between" width="100%">
                        <Text fontSize="18px" textAlign="center" lineHeight="1">
                            Next threshold:
                        </Text>

                        <Show>
                            <Show.When isTrue={!launchpad}>
                                <Loader.Skeleton width="60px" height="18px" />
                            </Show.When>
                            <Show.Else>
                                <Text fontSize="18px" textAlign="center" lineHeight="1">
                                    {launchpad?.nextThreshold}
                                </Text>
                            </Show.Else>
                        </Show>
                    </Flex>

                    <Show>
                        <Show.When isTrue={!launchpad}>
                            <Loader.Skeleton width="100%" height="47px" />
                        </Show.When>
                        <Show.Else>
                            <Range pollingToken={launchpad?.poolingToken} />
                        </Show.Else>
                    </Show>
                </Flex>

                <Flex justifyContent="space-between">
                    <Text fontSize="18px" textAlign="center" lineHeight="1">
                        Tokens submitted:
                    </Text>

                    <Show>
                        <Show.When isTrue={!launchpad}>
                            <Loader.Skeleton width="60px" height="18px" />
                        </Show.When>
                        <Show.Else>
                            <Text fontSize="18px" textAlign="center" lineHeight="1">
                                {launchpad?.tokensSubmitted}
                            </Text>
                        </Show.Else>
                    </Show>
                </Flex>

                <Flex justifyContent="space-between">
                    <Text fontSize="18px" textAlign="center" lineHeight="1" color={config.theme.greenLight}>
                        Tokens confirmed:
                    </Text>

                    <Show>
                        <Show.When isTrue={!launchpad}>
                            <Loader.Skeleton width="60px" height="18px" />
                        </Show.When>
                        <Show.Else>
                            <Text fontSize="18px" textAlign="center" lineHeight="1" color={config.theme.greenLight}>
                                {launchpad?.tokensConfirmed}
                            </Text>
                        </Show.Else>
                    </Show>
                </Flex>

                <Flex justifyContent="space-between">
                    <Text fontSize="18px" textAlign="center" lineHeight="1" color={config.theme.yellow}>
                        Tokens pending:
                    </Text>

                    <Show>
                        <Show.When isTrue={!launchpad}>
                            <Loader.Skeleton width="60px" height="18px" />
                        </Show.When>
                        <Show.Else>
                            <Text fontSize="18px" textAlign="center" lineHeight="1" color={config.theme.yellow}>
                                {launchpad?.tokensPending}
                            </Text>
                        </Show.Else>
                    </Show>
                </Flex>

                <Flex justifyContent="space-between">
                    <Text fontSize="18px" textAlign="center" lineHeight="1">
                        Tokens required:
                    </Text>

                    <Show>
                        <Show.When isTrue={!launchpad}>
                            <Loader.Skeleton width="60px" height="18px" />
                        </Show.When>
                        <Show.Else>
                            <Text fontSize="18px" textAlign="center" lineHeight="1">
                                {launchpad?.tokensRequired}
                            </Text>
                        </Show.Else>
                    </Show>
                </Flex>
            </BoxWrapperRow>
        </Box>
    );
};
