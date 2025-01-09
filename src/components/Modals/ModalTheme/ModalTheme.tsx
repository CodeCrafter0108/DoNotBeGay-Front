import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@/styles/global';
import Image from 'next/image';
import { useModal } from '@/contexts/ModalContext';
import { Button } from '@/components/Button';
import { ModalThemeContent, ModalThemeItem, ModalThemeWrapper } from './styles';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAccount } from 'wagmi';
import { Toggle } from '@/components/Toggle';
import { LOCAL_STORAGE_KEYS } from '@/config/constants';

type BgVariant = 'default' | '1' | '2' | '3' | '4' | '5';

const VARIANTS_TO_SHOW = ['1', '2', '3', '4', '5'] as const;

export const ModalTheme: React.FC = () => {
    const { address } = useAccount();
    const { closeModal } = useModal();

    const [variant, setVariant] = useLocalStorage(`bg-variant-${address}`, 'default');
    const [showMemes, setShowMemes] = useLocalStorage(LOCAL_STORAGE_KEYS.SHOW_MEMES, false);

    const [selected, setSelected] = useState(variant);
    const [selectedShowMemes, setSelectedShowMemes] = useState(showMemes);

    const handleUpdateTheme = (variant: BgVariant) => {
        setSelected(variant);
    };

    const handleSaveTheme = () => {
        setVariant(selected);
        setShowMemes(selectedShowMemes);
        closeModal();
    };

    const handleToggleMemes = (value: boolean) => {
        setSelectedShowMemes(value);
    };

    useEffect(() => {
        setSelectedShowMemes(showMemes);
    }, [showMemes]);

    useEffect(() => {
        setSelected(variant);
    }, [variant]);

    return (
        <ModalThemeWrapper>
            <Flex justifyContent="space-between">
                <Text fontSize="28px" fontWeight="500" lineHeight="0.5">
                    Select Theme
                </Text>
                <Flex cursor="pointer" onClick={closeModal}>
                    <Image src="/img/icons/close.svg" alt="Close" width={14} height={14} />
                </Flex>
            </Flex>

            <Flex>
                <Toggle title="Show memes" value={selectedShowMemes} onChange={handleToggleMemes} />
            </Flex>

            <ModalThemeContent>
                <ModalThemeItem selected={selected === 'default'} onClick={() => handleUpdateTheme('default')}>
                    <Image src="/img/bgs/default.svg" alt="" width={202} height={132} />
                </ModalThemeItem>

                {VARIANTS_TO_SHOW.map((bg) => (
                    <ModalThemeItem key={bg} selected={selected === bg} onClick={() => handleUpdateTheme(bg)}>
                        <Image src={`/img/bgs/${bg}.svg`} alt="" width={202} height={132} />
                    </ModalThemeItem>
                ))}
            </ModalThemeContent>

            <Flex alignItems="center" justifyContent="space-between">
                <Button.Secondary onClick={closeModal}>Cancel</Button.Secondary>
                <Button.Primary onClick={handleSaveTheme}>Save</Button.Primary>
            </Flex>
        </ModalThemeWrapper>
    );
};
