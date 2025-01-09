import React, { useEffect, useMemo, useState } from 'react';
import { DesktopHeaderWrapper, MobileHeaderContent, MobileHeaderHead, MobileHeaderWrapper } from '@/components/Header/styles';
import { Box } from '@/components/Box/Box';
import { FadeIn, Flex, Text } from '@/styles/global';
import { Icon } from '@/components/Icon';
import { ModalsType, useModal } from '@/contexts/ModalContext';
import { Show } from '@/components/Show';
import { useUser } from '@/hooks/useUser';
import { motion } from 'framer-motion';
import { springOpacity } from '@/common/animations';
import { HeaderTabs, HeaderType, SidebarItem } from '@/components/Header/types';
import { Burger } from '@/components/Header/Burger';
import { Sidebar } from './Sidebar';

import Image from 'next/image';
import { menuItems, socialItems } from '@/components/Header/links';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { useAccount } from 'wagmi';
import { ChainId } from '@/config/constants';
import { DashboardTab } from '../DashboardTab';
import { Loader } from '../Loader';
import { useWagmiConnector } from '@/hooks/useWagmiConnector';

const pathTabs = ['/dashboard/profile', '/dashboard/leaderboard', '/dashboard/ways-to-earn', '/staking/stake', '/staking/unstake'];

export const DesktopHeader: React.FC = () => {
    const { chainId, isConnected } = useAccount();
    const { disconnect } = useWagmiConnector();
    const { showModal } = useModal();
    const { data: user, isLoading } = useUser();

    const router = useRouter();
    const pathname = usePathname();

    const isShowTabs = useMemo(() => {
        return pathTabs.includes(pathname);
    }, [pathname]);

    const isDashboard = useMemo(() => {
        return pathname.includes('dashboard');
    }, [pathname]);

    const handleDisconnect = () => {
        disconnect();
    };

    const activeTab = useMemo(() => {
        if (pathname.includes('/leaderboard')) return HeaderTabs.LEADERBOARD;
        if (pathname.includes('/ways-to-earn')) return HeaderTabs.WAYS_TO_EARN;
        if (pathname.includes('/stake')) return HeaderTabs.STAKE;
        if (pathname.includes('/unstake')) return HeaderTabs.UNSTAKE;
        return HeaderTabs.PROFILE;
    }, [pathname]);

    return (
        <DesktopHeaderWrapper isShowTabs={isShowTabs}>
            <Show.When isTrue={isShowTabs && isDashboard}>
                <Box pixelatedCorners={['topLeft', 'bottomLeft', 'bottomRight', 'topRight']} height="60px">
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
            </Show.When>

            <Show.When isTrue={isShowTabs && !isDashboard}>
                <Box pixelatedCorners={['topLeft', 'bottomLeft', 'bottomRight', 'topRight']} height="60px">
                    <Flex alignItems="center" height="100%">
                        <DashboardTab active={activeTab === HeaderTabs.STAKE} onClick={() => router.push('/staking/stake')}>
                            Stake
                        </DashboardTab>
                        <DashboardTab active={activeTab === HeaderTabs.UNSTAKE} onClick={() => router.push('/staking/unstake')}>
                            Unstake
                        </DashboardTab>
                    </Flex>
                </Box>
            </Show.When>

            <Flex>
                <Box pixelatedCorners={['topLeft', 'bottomLeft', 'bottomRight', 'topRight']}>
                    <Flex alignItems="center" height="100%">
                        <Icon.Chain chainId={chainId || ChainId.ETHEREUM} />
                    </Flex>
                </Box>

                <Box pixelatedCorners={['topLeft', 'bottomLeft']} radius="0" height="60px" width="220px">
                    <Flex alignItems="center" height="100%" cursor="pointer">
                        <Show.When isTrue={isLoading}>
                            <Loader.Text text="Loading" color="#fff" />
                        </Show.When>

                        <Show.When isTrue={!isLoading && isConnected}>
                            <Text fontSize="18px">{user?.name}</Text>
                            <Icon.User user={user} />
                            <Icon.Svg name="disconnect" cursor="pointer" onClick={handleDisconnect} />
                        </Show.When>

                        <Show.When isTrue={!isLoading && !isConnected}>
                            <Flex onClick={() => showModal(ModalsType.connect)} alignItems="center" cursor="pointer">
                                <Icon.Svg name="wallet" />
                                <Text fontSize="18px">Connect wallet</Text>
                            </Flex>
                        </Show.When>
                    </Flex>
                </Box>
            </Flex>
        </DesktopHeaderWrapper>
    );
};

export const MobileHeader: React.FC = () => {
    const { showModal } = useModal();
    const router = useRouter();

    const { data: user, isLoading: isUserLoading } = useUser();
    const [isOpened, setIsOpened] = useState(false);

    const handleClick = (item: SidebarItem) => {
        if (item.modal) showModal(item.modal);
        else if (item.link) {
            router.push(item.link);
        }
        setIsOpened(false);
    };

    useEffect(() => {
        if (isOpened) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpened]);

    return (
        <MobileHeaderWrapper>
            <MobileHeaderHead>
                <Image src="/img/icons/sidebar-logo.svg" alt="" width={40} height={40} />
                <Burger isOpened={isOpened} onClick={() => setIsOpened(!isOpened)} />
            </MobileHeaderHead>

            {isOpened && (
                <FadeIn>
                    <MobileHeaderContent>
                        <Flex flexDirection="column" gap={30}>
                            {menuItems.map((item, index) => (
                                <Flex key={index} alignItems="center" cursor="pointer" onClick={() => handleClick(item)}>
                                    <Icon.Svg name={item.icon} />
                                    {isOpened && (
                                        <motion.div {...springOpacity}>
                                            <Text wrap="nowrap">{item.text}</Text>
                                        </motion.div>
                                    )}
                                </Flex>
                            ))}
                        </Flex>

                        <Flex flexDirection="column" gap={30}>
                            <Flex>
                                <Button.Primary width="100%" onClick={() => showModal(ModalsType.connect)}>
                                    <Show.When isTrue={!isUserLoading && !!user}>
                                        {user?.name}
                                        <Icon.User user={user} />
                                    </Show.When>

                                    <Show.When isTrue={isUserLoading}>Loading...</Show.When>

                                    <Show.When isTrue={!isUserLoading && !user}>
                                        <Flex alignItems="center">
                                            <Icon.Svg name="wallet" />
                                            Connect wallet
                                        </Flex>
                                    </Show.When>
                                </Button.Primary>
                            </Flex>

                            <Flex justifyContent="center" gap={30}>
                                {socialItems.map((item, index) => (
                                    <Flex key={index} alignItems="center" cursor="pointer" onClick={() => handleClick(item)}>
                                        <Icon.Svg name={item.icon} />
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                    </MobileHeaderContent>
                </FadeIn>
            )}
        </MobileHeaderWrapper>
    );
};

export const Header: HeaderType = {
    Desktop: DesktopHeader,
    Mobile: MobileHeader,
    Sidebar: Sidebar,
};
