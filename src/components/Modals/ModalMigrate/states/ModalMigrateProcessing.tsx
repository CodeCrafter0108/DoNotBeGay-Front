import { Loader } from '@/components/Loader';
import { useConfig } from '@/contexts/ConfigContext';
import { Flex, Text } from '@/styles/global';
import React from 'react';
import { ModalMigrateContent } from '../styles';

export const ModalMigrateProcessing: React.FC = () => {
    const { theme } = useConfig();

    return (
        <ModalMigrateContent>
            <Text fontSize="28px" textAlign="center" lineHeight="1">
                Migrate processing
            </Text>

            <Flex alignItems="center" justifyContent="center" padding="20px">
                <Loader.Dots count={6} color={theme.accent} />
            </Flex>
        </ModalMigrateContent>
    );
};
