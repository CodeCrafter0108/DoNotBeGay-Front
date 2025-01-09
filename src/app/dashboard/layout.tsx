'use client';

import { Box } from '@/components/Box';
import { HeaderTabs } from '@/components/Header/types';
import { Flex } from '@/styles/global';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { DashboardTab } from '../../components/DashboardTab';
import { Show } from '@/components/Show';
import { Breakpoints } from '@/styles/breakpoints';
import { motion } from 'framer-motion';
import { springToTop } from '@/common/animations';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();

    const activeTab = useMemo(() => {
        if (pathname.includes('leaderboard')) return HeaderTabs.LEADERBOARD;
        if (pathname.includes('ways-to-earn')) return HeaderTabs.WAYS_TO_EARN;
        return HeaderTabs.PROFILE;
    }, [pathname]);

    return (
        <>
            <Show.Toggle showBelow={Breakpoints.lg}>
                <motion.div {...springToTop}>
                    <Flex justifyContent="center" paddingTop="70px" paddingLeft="10px" paddingRight="10px">
                        <Box pixelatedCorners={['topLeft', 'bottomLeft', 'bottomRight', 'topRight']} height="60px" width="100%">
                            <Flex alignItems="center" height="100%">
                                <DashboardTab active={activeTab === HeaderTabs.PROFILE} onClick={() => router.push('/dashboard/profile')}>
                                    Profile
                                </DashboardTab>
                                <DashboardTab active={activeTab === HeaderTabs.LEADERBOARD} onClick={() => router.push('/dashboard/leaderboard')}>
                                    Leaderboard
                                </DashboardTab>
                                <DashboardTab active={activeTab === HeaderTabs.WAYS_TO_EARN} onClick={() => router.push('/dashboard/ways-to-earn')}>
                                    Ways to Earn
                                </DashboardTab>
                            </Flex>
                        </Box>
                    </Flex>
                </motion.div>
            </Show.Toggle>

            {children}
        </>
    );
}
