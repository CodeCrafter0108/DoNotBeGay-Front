import React, { useEffect, useState } from 'react';
import { ModalMigrateWrapper } from './styles';
import { MigrateProcessType, MigrateState, ModalMigrateProps } from './types';
import { useModal } from '@/contexts/ModalContext';
import { Show } from '@/components/Show';

import { ModalMigrateDefault, ModalMigrateSuccess, ModalMigrateError, ModalMigrateProcessing } from './states';
import { FadeIn } from '@/styles/global';
import { ContractCall, IToken } from '@/types/tournament';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { migrations } from '@/config/contracts';
import { useActiveChainId } from '@/hooks/useActiveChainId';
import { Address, erc20Abi, Hash } from 'viem';
import { migrationAbi } from '@/config/abis/migrationAbi';
import { useToken } from '@/hooks/useToken';

export const ModalMigrate: React.FC<ModalMigrateProps> = () => {
    const { closeModal, modalProps } = useModal();
    const tokenAddress = modalProps as Address;

    const { address } = useAccount();
    const { chainId } = useActiveChainId();
    const { writeContract } = useWriteContract();

    const [hash, setHash] = useState<Hash>();
    const [migrateState, setMigrateState] = useState(MigrateState.DEFAULT);
    const [migrateType, setMigrateType] = useState<MigrateProcessType>();

    const { data: txReceipt } = useWaitForTransactionReceipt({ hash, confirmations: 1 });
    const { data: token, refetch } = useToken({ chainId, address, tokenAddress });

    const handleApprove = () => {
        const migrateAddr = migrations[chainId];

        if (!token) return;

        const params = {
            address: token.address,
            abi: erc20Abi,
            functionName: 'approve',
            args: [migrateAddr, token.balanceRaw],
            chainId,
        } as ContractCall<[Address, bigint]>;

        const handleSuccess = (hash: Hash) => {
            setHash(hash);
            setMigrateType(MigrateProcessType.APPROVE);
        };

        const handleError = (error: Error) => {
            console.error('Approve error', error);
            setMigrateState(MigrateState.ERROR);
        };

        writeContract({ ...params }, { onSuccess: handleSuccess, onError: handleError });
    };

    const handleMigrate = () => {
        if (!token) return;

        setMigrateState(MigrateState.PROCESSING);

        const migrationAddr = migrations[chainId];

        const params = {
            address: migrationAddr,
            abi: migrationAbi,
            functionName: 'migration',
            args: [token?.address],
        } as ContractCall<[Address]>;

        const handleSuccess = (hash: Hash) => {
            setHash(hash);
            setMigrateType(MigrateProcessType.MIGRATE);
        };

        const handleError = (error: Error) => {
            console.error('Migrate error', error);
            setMigrateState(MigrateState.ERROR);
        };

        writeContract({ ...params }, { onSuccess: handleSuccess, onError: handleError });
    };

    const handleTrade = () => {
        console.debug('Trade');
    };

    useEffect(() => {
        if (txReceipt) {
            if (migrateType === MigrateProcessType.APPROVE) {
                setMigrateState(MigrateState.SUCCESS);
            } else if (migrateType === MigrateProcessType.MIGRATE) {
                setMigrateState(MigrateState.SUCCESS);
            }

            refetch();
        }
    }, [txReceipt, migrateType, refetch]);

    return (
        <ModalMigrateWrapper>
            {/* Default state */}
            <Show.When isTrue={migrateState === MigrateState.DEFAULT}>
                <FadeIn>
                    <ModalMigrateDefault token={token as IToken} onCancel={closeModal} onMigrate={handleMigrate} onApprove={handleApprove} />
                </FadeIn>
            </Show.When>

            {/* Migrate success state */}
            <Show.When isTrue={migrateState === MigrateState.SUCCESS}>
                <FadeIn>
                    <ModalMigrateSuccess token={token as IToken} onCancel={closeModal} onTrade={handleTrade} />
                </FadeIn>
            </Show.When>

            {/* Migrate error state */}
            <Show.When isTrue={migrateState === MigrateState.ERROR}>
                <FadeIn>
                    <ModalMigrateError onCancel={closeModal} />
                </FadeIn>
            </Show.When>

            {/* Migrate processing state */}
            <Show.When isTrue={migrateState === MigrateState.PROCESSING}>
                <FadeIn>
                    <ModalMigrateProcessing />
                </FadeIn>
            </Show.When>
        </ModalMigrateWrapper>
    );
};
