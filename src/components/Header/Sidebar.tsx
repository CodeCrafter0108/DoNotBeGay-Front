import React, { useState } from 'react';
import { SidebarWrapper } from './styles';
import { Absolute, Flex, Text } from '@/styles/global';
import { Icon } from '@/components/Icon';
import Image from 'next/image';
import { Box } from '@/components/Box';
import { motion } from 'framer-motion';
import { springOpacity, springToRight } from '@/common/animations';
import { useModal } from '@/contexts/ModalContext';
import { usePathname, useRouter } from 'next/navigation';
import { menuItems, socialItems } from '@/components/Header/links';
import { SidebarItem } from '@/components/Header/types';
import { useConfig } from '@/contexts/ConfigContext';

export const Sidebar: React.FC = () => {
    const { theme } = useConfig();
    const { showModal } = useModal();
    const [isOpened, setIsOpened] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (item: SidebarItem) => {
        if (item.modal) showModal(item.modal);
        else if (item.link) {
            router.push(item.link);
        }
    };

    const isActive = (item: SidebarItem) => {
        if (item.link) {
            return pathname === item.link;
        }
        return false;
    };

    return (
        <SidebarWrapper isOpened={isOpened} onMouseEnter={() => setIsOpened(true)} onMouseLeave={() => setIsOpened(false)}>
            <motion.div {...springToRight} style={{ height: '100%' }}>
                <Absolute top="0" right="-4px" height="100%">
                    <Box pixelatedCorners={['topRight', 'bottomRight']} height="100%" radius="0" backgroundColor="#00000050" />
                </Absolute>

                <Box pixelatedCorners={['topRight', 'bottomRight']} height="100%" radius="0">
                    <Flex flexDirection="column" alignItems="center" justifyContent="space-between" height="100%" gap={24} paddingTop="5px">
                        <Image src="/img/icons/sidebar-logo.svg" alt="" width={49} height={48} />

                        <Flex flexDirection="column" justifyContent="space-between" height="100%">
                            <Flex flexDirection="column" gap={40}>
                                {menuItems.map((item, index) => (
                                    <Flex key={index} alignItems="center" cursor="pointer" onClick={() => handleClick(item)}>
                                        <Icon.SvgRemote src={`/img/icons/${item.icon}.svg`} color={isActive(item) ? theme.accent : '#fff'} />
                                        {isOpened && (
                                            <motion.div {...springOpacity} transition={{ delay: 0.1 }}>
                                                <Text wrap="nowrap" color={isActive(item) ? theme.accent : '#fff'}>
                                                    {item.text}
                                                </Text>
                                            </motion.div>
                                        )}
                                    </Flex>
                                ))}
                            </Flex>

                            <Flex flexDirection="column" gap={40} paddingBottom="12px">
                                {socialItems.map((item, index) => (
                                    <Flex key={index} alignItems="center" cursor="pointer" onClick={() => handleClick(item)}>
                                        <Icon.Svg name={item.icon} />
                                        {isOpened && (
                                            <motion.div {...springOpacity} transition={{ delay: 0.1 }}>
                                                <Text wrap="nowrap">{item.text}</Text>
                                            </motion.div>
                                        )}
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </motion.div>
        </SidebarWrapper>
    );
};
