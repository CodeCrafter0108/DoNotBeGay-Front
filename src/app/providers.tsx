'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type State, WagmiProvider } from 'wagmi';

import { ModalProvider } from '@/contexts/ModalContext';
import { Modals } from '@/components/Modals';

import { DialogProvider } from '@/contexts/DialogContext';
import { Dialogs } from '@/components/Dialog';

import { config } from '@/config/wagmi';
import { ConfigProvider } from '@/contexts/ConfigContext';
import { BackgroundWrapper } from '@/styles/global';
import { Header } from '@/components/Header';
import { useBackground } from '@/hooks/useBackground';
import NextImage from 'next/image';
import { Show } from '@/components/Show';
import { Breakpoints } from '@/styles/breakpoints';
import { usePathname } from 'next/navigation';

type Props = {
    children: ReactNode;
    initialState: State | undefined;
};

const queryClient = new QueryClient();

const Background: React.FC = () => {
    const { data: bgVariant } = useBackground();
    const [isClient, setIsClient] = useState(false);
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
        const variant = bgVariant && bgVariant !== 'null' ? bgVariant : 'default';
        const img = new Image();

        img.src = `/img/bgs/${variant}.svg`;
        img.onload = () => setTimeout(() => setSrc(img.src), 0);

        if (bgVariant && bgVariant !== 'null') {
        }
    }, [bgVariant]);

    if (!isClient) {
        return null;
    }

    return <BackgroundWrapper>{src && <NextImage src={src} alt="" fill />}</BackgroundWrapper>;
};

export function Providers({ children, initialState }: Props) {
    const pathname = usePathname();
    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider>
                    <Background />

                    <DialogProvider>
                        <ModalProvider>
                            {pathname !== '/' && (
                                <Show.Toggle showAbove={Breakpoints.lg}>
                                    <Header.Desktop />
                                    <Header.Sidebar />
                                </Show.Toggle>
                            )}

                            {pathname !== '/' && (
                                <Show.Toggle showBelow={Breakpoints.lg}>
                                    <Header.Mobile />
                                </Show.Toggle>
                            )}

                            <Modals />
                            {children}
                        </ModalProvider>
                        <Dialogs />
                    </DialogProvider>
                </ConfigProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
