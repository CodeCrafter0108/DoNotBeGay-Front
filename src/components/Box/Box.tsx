import React from 'react';
import { BoxProps } from '@/components/Box/types';
import { BoxWrapper } from '@/components/Box/styles';

export const Box: React.FC<BoxProps> = ({ children, ...rest }) => {
    return <BoxWrapper {...rest}>{children}</BoxWrapper>;
};
