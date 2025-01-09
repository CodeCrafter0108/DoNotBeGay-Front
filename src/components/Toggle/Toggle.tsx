import React from 'react';
import { ToggleProps } from './types';
import { ToggleContent, ToggleWrapper } from '@/components/Toggle/styles';
import { Text } from '@/styles/global';

export const Toggle: React.FC<ToggleProps> = ({ title, value, onChange }) => {
    return (
        <ToggleWrapper onClick={() => onChange(!value)}>
            <ToggleContent value={value} />

            {title && (
                <Text fontSize="20px" lineHeight="1">
                    {title}
                </Text>
            )}
        </ToggleWrapper>
    );
};
