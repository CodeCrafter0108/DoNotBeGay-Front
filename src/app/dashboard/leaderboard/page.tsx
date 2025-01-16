'use client';

import { BoxRow, Container, Flex, Text, PageContainer, PageSearchWrapper, Absolute } from '@/styles/global';
import { springToBottom } from '@/common/animations';
import { motion } from 'framer-motion';
import { Table } from './components/Table';
import { Box } from '@/components/Box';
import { useMemo, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '@/config/constants';
import { Input } from '@/components/Input';
import { useActiveChainId } from '@/hooks/useActiveChainId';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import Image from 'next/image';
import { useDebounce } from 'use-debounce';

export default function Leaderboard() {
    const { chainId } = useActiveChainId();
    const { data: leaderboard } = useLeaderboard({ chainId });

    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 300);
    const [showMemes] = useLocalStorage(LOCAL_STORAGE_KEYS.SHOW_MEMES);

    const profiles = useMemo(() => {
        return [...(leaderboard ?? [])].sort((a, b) => b.points.total - a.points.total);
    }, [leaderboard]);

    return (
        <Container paddingMobile="10px">
            <motion.div {...springToBottom}>
                <PageContainer>
                    <Box padding="0">
                        <BoxRow>
                            <Flex flexDirection="column" zIndex={1}>
                                <Text fontSize="28px">Leaderboard</Text>
                                <PageSearchWrapper>
                                    <Input.Search value={search} onChange={setSearch} placeholder="Search" />
                                </PageSearchWrapper>
                            </Flex>

                            <Flex paddingTop="20px">
                                <Table profiles={profiles} search={debouncedSearch} />
                            </Flex>

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
