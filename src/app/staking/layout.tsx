'use client';

import { Box } from '@/components/Box';
import { HeaderTabs } from '@/components/Header/types';
import { Container, Flex, Text, PageContainer } from '@/styles/global';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { DashboardTab } from '../../components/DashboardTab';
import { Show } from '@/components/Show';
import { Breakpoints } from '@/styles/breakpoints';
import { motion } from 'framer-motion';
import { springToTop } from '@/common/animations';
import { useConfig } from '@/contexts/ConfigContext';
import { LayoutWrapper } from './styles';

const InfoCards: React.FC = () => {
    const { theme } = useConfig();

    return (
        <LayoutWrapper>
            <Box padding="32px">
                <Flex flexDirection="column" alignItems="center" gap={0}>
                    <Text fontSize="28px" lineHeight="1">
                        APR
                    </Text>
                    <Text fontSize="36px" color={theme.accent} lineHeight="1">
                        123.23%
                    </Text>
                </Flex>
            </Box>

            <Box padding="32px">
                <Flex flexDirection="column" alignItems="center" gap={0}>
                    <Text fontSize="28px" lineHeight="1">
                        TVL
                    </Text>
                    <Text fontSize="36px" color={theme.accent} lineHeight="1">
                        $15,254,000
                    </Text>
                </Flex>
            </Box>

            <Box padding="32px">
                <Flex flexDirection="column" alignItems="center" gap={0}>
                    <Text fontSize="28px" lineHeight="1">
                        Points
                    </Text>
                    <Text fontSize="36px" color={theme.accent} lineHeight="1">
                        1,234,254
                    </Text>
                </Flex>
            </Box>
        </LayoutWrapper>
    );
};

export default function StakingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();

    const activeTab = useMemo(() => {
        if (pathname.includes('/stake')) return HeaderTabs.STAKE;
        if (pathname.includes('/unstake')) return HeaderTabs.UNSTAKE;
        return HeaderTabs.PROFILE;
    }, [pathname]);

    return (
        <>
            <Show.Toggle showBelow={Breakpoints.lg}>
                <motion.div {...springToTop}>
                    <Flex justifyContent="center" paddingTop="70px" paddingLeft="10px" paddingRight="10px">
                        <Box pixelatedCorners={['topLeft', 'bottomLeft', 'bottomRight', 'topRight']} height="60px" width="100%">
                            <Flex alignItems="center" justifyContent="center" height="100%">
                                <DashboardTab active={activeTab === HeaderTabs.STAKE} onClick={() => router.push('/staking/stake')}>
                                    Stake
                                </DashboardTab>
                                <DashboardTab active={activeTab === HeaderTabs.UNSTAKE} onClick={() => router.push('/staking/unstake')}>
                                    Unstake
                                </DashboardTab>
                            </Flex>
                        </Box>
                    </Flex>
                </motion.div>
            </Show.Toggle>

            <Container paddingMobile="10px">
                <PageContainer>
                    <InfoCards />
                    {children}
                </PageContainer>
            </Container>
        </>
    );
}
