'use client';

import React from 'react';
import { ModalsType, useModal } from '@/contexts/ModalContext';
import { AnimatePresence } from 'framer-motion';
import { ModalWrapper, Wrapper, WrapperContent, WrapperOverlay } from './styles';

import { ModalConnect } from './ModalConnect';
import { ModalTheme } from '@/components/Modals/ModalTheme';
import { ModalLiquidity } from '@/components/Modals/ModalLiquidity';
import { ModalMigrate } from './ModalMigrate';

export const Modals: React.FC = () => {
    const { currentModal, closeModal } = useModal();

    if (!currentModal) return null;

    const renderModalContent = () => {
        switch (currentModal) {
            case ModalsType.connect:
                return <ModalConnect />;
            case ModalsType.theme:
                return <ModalTheme />;
            case ModalsType.liquidity:
                return <ModalLiquidity />;
            case ModalsType.migrate:
                return <ModalMigrate />;
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            <Wrapper>
                <WrapperOverlay onClick={closeModal} />
                <WrapperContent>
                    <ModalWrapper>{renderModalContent()}</ModalWrapper>
                </WrapperContent>
            </Wrapper>
        </AnimatePresence>
    );
};
