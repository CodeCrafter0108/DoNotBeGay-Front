import React from 'react';
import { useDialog } from '@/contexts/DialogContext';
import { Flex, Grid, Text } from '@/styles/global';
import { Wrapper } from './styles';
import { DialogBody } from '../styles';
import Image from 'next/image';

interface Props {
    onClose: () => void;
}

export const DialogError: React.FC<Props> = ({ onClose }) => {
    const { dialogText } = useDialog();

    return (
        <Wrapper>
            <Grid gap={5}>
                <Flex alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center">
                        <Text fontWeight="600">Error</Text>
                    </Flex>
                    <Flex cursor="pointer" onClick={onClose}>
                        <Image src="/img/icons/close.svg" alt="Close" width={14} height={14} />
                    </Flex>
                </Flex>

                <DialogBody>
                    <Text fontWeight="500">{dialogText}</Text>
                </DialogBody>
            </Grid>
        </Wrapper>
    );
};
