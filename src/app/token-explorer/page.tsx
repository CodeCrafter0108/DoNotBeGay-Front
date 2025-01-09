'use client';

import { Absolute, BoxRow, Container, FadeIn, Flex, PageContainer, PageSearchWrapper, Text } from '@/styles/global';
import { Box } from '@/components/Box';
import { Input } from '@/components/Input';
import React, { useState } from 'react';
import { Table } from './components/Table';
import { springToBottom } from '@/common/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '@/config/constants';
import { useExplorer } from '@/hooks/useExplorer';
import { useActiveChainId } from '@/hooks/useActiveChainId';
import { Loader } from '@/components/Loader';
import { Show } from '@/components/Show';
import { useConfig } from '@/contexts/ConfigContext';

export default function TokenExplorer() {
    const [search, setSearch] = useState('');
    const [showMemes] = useLocalStorage(LOCAL_STORAGE_KEYS.SHOW_MEMES);

    const { theme } = useConfig();
    const { chainId } = useActiveChainId();
    const { data, isLoading } = useExplorer({ chainId });

    return (
        <Container>
            <motion.div {...springToBottom}>
                <PageContainer>
                    <Box padding="0">
                        <BoxRow>
                            <Flex flexDirection="column" zIndex={1}>
                                <Text fontSize="28px">Token Explorer</Text>
                                <PageSearchWrapper>
                                    <Input.Search value={search} onChange={setSearch} placeholder="Search" />
                                </PageSearchWrapper>
                            </Flex>

                            <Show.When isTrue={isLoading}>
                                <Box padding="50px">
                                    <Loader.Dots count={6} color={theme.accent} />
                                </Box>
                            </Show.When>

                            <Show.When isTrue={!isLoading}>
                                <FadeIn>
                                    <Flex paddingTop="20px">
                                        <Table tokens={data || []} />
                                    </Flex>
                                </FadeIn>
                            </Show.When>

                            {showMemes && (
                                <Absolute top="-10px" right="0">
                                    <Image src="/img/memes/green-man.svg" alt="" width={462} height={156} />
                                </Absolute>
                            )}
                        </BoxRow>
                    </Box>
                </PageContainer>
            </motion.div>
        </Container>
    );
}
