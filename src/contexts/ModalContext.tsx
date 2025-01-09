'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

export enum ModalsType {
    connect = 'modal-connect',
    theme = 'modal-theme',
    liquidity = 'modal-liquidity',
    migrate = 'modal-migrate',
}

interface ModalContextType<T = any> {
    currentModal: ModalsType | null;
    modalProps: T;
    showModal: (modal: ModalsType, props?: T) => void;
    closeModal: () => void;
    updateProps: <T>(props: T) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [currentModal, setCurrentModal] = useState<ModalsType | null>(null);
    const [modalProps, setModalProps] = useState<any>(null);

    const showModal = <T,>(modal: ModalsType, props?: T) => {
        setCurrentModal(modal);
        setModalProps(props);
    };

    const closeModal = () => {
        setCurrentModal(null);
        setModalProps(null);
    };

    const updateProps = <T,>(props: T) => {
        setModalProps(props);
    };

    return <ModalContext.Provider value={{ currentModal, modalProps, showModal, closeModal, updateProps }}>{children}</ModalContext.Provider>;
};

export const useModal = <T,>() => {
    const context = useContext<ModalContextType<T> | undefined>(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
