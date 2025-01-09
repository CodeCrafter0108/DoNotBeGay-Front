import React from 'react';
import { useConfig } from '@/contexts/ConfigContext';
import { Flex, Text } from '@/styles/global';
import { Icon } from '@/components/Icon';
import { PaginationProps } from '@/components/Pagination/types';

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPrev, onNext }) => {
    const config = useConfig();

    return (
        <Flex alignItems="center" justifyContent="space-between" width="100%" paddingBottom="5px">
            <Icon.Svg name="arrow-left" size={24} cursor="pointer" onClick={onPrev} disabled={currentPage <= 1} />

            <Text fontSize="18px" color={config.theme.accent}>
                Page {currentPage}/{totalPages}
            </Text>

            <Icon.Svg name="arrow-right" size={24} cursor="pointer" onClick={onNext} disabled={currentPage >= totalPages} />
        </Flex>
    );
};
