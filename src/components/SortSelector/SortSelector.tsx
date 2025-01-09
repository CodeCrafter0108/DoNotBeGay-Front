import React from 'react';
import { Flex, Text } from '@/styles/global';
import { Show } from '../Show';
import { useConfig } from '@/contexts/ConfigContext';
import { SortSelectorProps, SortType } from '@/components/SortSelector/types';

export const SortSelector: React.FC<SortSelectorProps> = ({ text, value = SortType.NONE, disabled = false, onChange }) => {
    const config = useConfig();

    const handleClick = () => {
        let newValue = SortType.ASC;

        if (value === SortType.ASC) {
            newValue = SortType.DESC;
        } else if (value === SortType.DESC) {
            newValue = SortType.NONE;
        }

        onChange && onChange(newValue);
    };

    return (
        <Flex alignItems="center" cursor="pointer" onClick={handleClick}>
            <Show.When isTrue={!disabled}>
                <Flex flexDirection="column" gap={2}>
                    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.53385 4.50033L4.20052 1.16699L0.867188 4.50033"
                            stroke="white"
                            strokeOpacity={value === SortType.ASC ? '1' : '0.6'}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.867188 1.5L4.20052 4.83333L7.53385 1.5"
                            stroke="white"
                            strokeOpacity={value === SortType.DESC ? '1' : '0.6'}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Flex>
            </Show.When>

            <Text fontSize="18px" selectable={false} color={config.theme.gray}>
                {text}
            </Text>
        </Flex>
    );
};
