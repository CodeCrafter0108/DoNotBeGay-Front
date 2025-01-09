import React from 'react';
import { Flex, Grid, Text } from '@/styles/global';
import { useModal } from '@/contexts/ModalContext';
import Image from 'next/image';
import { ModalLiquidityTextWrapper, ModalLiquidityWrapper } from '@/components/Modals/ModalLiquidity/styles';

export const ModalLiquidity: React.FC = () => {
    const { closeModal } = useModal();

    return (
        <Grid gap={40}>
            <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize="28px" fontWeight="500">
                    Manage Liquidity
                </Text>
                <Flex cursor="pointer" onClick={closeModal}>
                    <Image src="/img/icons/close.svg" alt="Close" width={14} height={14} />
                </Flex>
            </Flex>

            <ModalLiquidityWrapper>
                <Image src="/img/memes/frog-04.svg" alt="" width={161} height={130} />
                <ModalLiquidityTextWrapper>
                    <Text fontSize="24px">You don`t have any liquidity to withdraw</Text>
                </ModalLiquidityTextWrapper>
            </ModalLiquidityWrapper>
        </Grid>
    );
};
