import React, { useMemo, useState } from 'react';
import { ModalWrapper } from '@/components/Modals/styles';
import { ModalTokenSelectProps } from '@/components/Modals/ModalTokenSelect/types';
import { Flex, Text } from '@/styles/global';
import { ModalTokenSelectItem, ModalTokenSelectList, ModalTokenSelectWrapper } from '@/components/Modals/ModalTokenSelect/styles';
import Image from 'next/image';
import { Input } from '@/components/Input';
import { useConfig } from '@/contexts/ConfigContext';
import { Formatter } from '@/utils';
import { Icon } from '@/components/Icon';

export const ModalTokenSelect: React.FC<ModalTokenSelectProps> = ({ tokens, valueType, onSelect, onClose }) => {
    const config = useConfig();

    const [search, setSearch] = useState('');

    const sortedTokens = tokens.sort((a, b) => {
        if (typeof a.balanceUsd === 'undefined' || typeof b.balanceUsd === 'undefined') return 0;
        if (a.isAvailable && !b.isAvailable) return -1;
        if (!a.isAvailable && b.isAvailable) return 1;
        if (a.balanceUsd === b.balanceUsd) return 0;
        return a.balanceUsd > b.balanceUsd ? -1 : 1;
    });

    const filtered = useMemo(() => {
        if (!search) return sortedTokens;
        return sortedTokens.filter((token) => token?.name?.toLowerCase().includes(search.toLowerCase()));
    }, [search, sortedTokens]);

    return (
        <ModalWrapper>
            <ModalTokenSelectWrapper>
                <Flex alignItems="center" justifyContent="space-between">
                    <Text fontSize="28px" fontWeight="500" lineHeight="0.5">
                        Select Token
                    </Text>
                    <Flex cursor="pointer" onClick={onClose}>
                        <Image src="/img/icons/close.svg" alt="Close" width={14} height={14} />
                    </Flex>
                </Flex>

                <Flex>
                    <Input.Search value={search} onChange={setSearch} placeholder="Search" />
                </Flex>

                <ModalTokenSelectList>
                    {filtered.map((token, index) => (
                        <ModalTokenSelectItem key={index} isAvailable={token.isAvailable} onClick={() => onSelect(valueType, token)}>
                            <Flex alignItems="center">
                                <Icon.Token.Remote path={token.imageUrl!} size={40} />
                                <Text fontSize="18px">{token.name}</Text>
                            </Flex>

                            <Flex flexDirection="column" gap={0}>
                                <Text fontSize="20px" textAlign="right">
                                    {Formatter.formatBalance(token.balance, 4)}
                                </Text>
                                <Text fontSize="16px" textAlign="right" color={config.theme.gray}>
                                    ${Formatter.formatNumber(token.balanceUsd)}
                                </Text>
                            </Flex>
                        </ModalTokenSelectItem>
                    ))}
                </ModalTokenSelectList>
            </ModalTokenSelectWrapper>
        </ModalWrapper>
    );
};
