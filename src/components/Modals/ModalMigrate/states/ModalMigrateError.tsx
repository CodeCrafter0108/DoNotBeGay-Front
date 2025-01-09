import React from 'react';
import { ModalMigrateErrorProps } from '../types';
import { ModalMigrateContent } from '../styles';
import { Button } from '@/components/Button';
import { Flex, Text } from '@/styles/global';

export const ModalMigrateError: React.FC<ModalMigrateErrorProps> = ({ onCancel }) => {
    return (
        <ModalMigrateContent>
            <Text fontSize="28px" textAlign="center" lineHeight="1">
                Migrate error
            </Text>
            <Flex justifyContent="center">
                <Button.Primary onClick={onCancel}>Close</Button.Primary>
            </Flex>
        </ModalMigrateContent>
    );
};
