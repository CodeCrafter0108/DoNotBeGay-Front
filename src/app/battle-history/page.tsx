'use client';

import { useState } from 'react';
import { Absolute, BoxRow, Container, Flex, PageContainer, PageSearchWrapper, Text } from '@/styles/global';
import { Box } from '@/components/Box';
import { Input } from '@/components/Input';
import { HistoryItem } from './components/HistoryItem';
import { BattleHistoryWrapper, BattleHistoryCards } from './styles';
import { springToBottom } from '@/common/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useHistory } from '@/hooks/useHistory';
import { useActiveChainId } from '@/hooks/useActiveChainId';
import { Show } from '@/components/Show';
import { Loader } from '@/components/Loader';
import { useConfig } from '@/contexts/ConfigContext';

export default function BattleHistory() {
    const { theme } = useConfig();
    const { chainId } = useActiveChainId();
    const { data, isLoading } = useHistory({ chainId });

    const [search, setSearch] = useState('');

    return (
        <Container>
            <motion.div {...springToBottom}>
                <PageContainer>
                    <Box padding="0">
                        <BoxRow>
                            <BattleHistoryWrapper>
                                <Flex flexDirection="column">
                                    <Text fontSize="28px">Battle History</Text>
                                    <PageSearchWrapper>
                                        <Input.Search value={search} onChange={setSearch} placeholder="Search" />
                                    </PageSearchWrapper>
                                </Flex>

                                <Show.When isTrue={!!data?.length && !isLoading}>
                                    <BattleHistoryCards>
                                        {data?.map((item, index) => <HistoryItem key={index} token={item.token} tournament={item.tournament} />)}
                                    </BattleHistoryCards>
                                </Show.When>

                                <Show.When isTrue={!data?.length && !isLoading}>
                                    <Flex justifyContent="center" padding="30px 0">
                                        <Text fontSize="24px">No history found</Text>
                                    </Flex>
                                </Show.When>

                                <Show.When isTrue={isLoading}>
                                    <Flex justifyContent="center" padding="30px 0">
                                        <Loader.Dots count={6} color={theme.accent} />
                                    </Flex>
                                </Show.When>
                            </BattleHistoryWrapper>
                        </BoxRow>

                        <Absolute top="0" right="15px" zIndex={-2}>
                            <Image src="/img/memes/trade.svg" alt="" width={417} height={153} />
                        </Absolute>
                    </Box>
                </PageContainer>
            </motion.div>
        </Container>
    );
}
