import React from 'react';
import { ButtonType, Props } from './types';
import { PrimaryWrapper, SecondaryWrapper } from '@/components/Button/styles';
import { Flex } from '@/styles/global';

const Primary: React.FC<Props> = ({ onClick, children, ...rest }) => {
    return (
        <PrimaryWrapper {...rest} onClick={onClick}>
            <Flex alignItems="center" justifyContent="center" flex={1} height="100%">
                {children}
            </Flex>
        </PrimaryWrapper>
    );
};

const Secondary: React.FC<Props> = ({ onClick, children, ...rest }) => {
    return (
        <SecondaryWrapper {...rest} onClick={onClick}>
            <Flex alignItems="center" justifyContent="center" flex={1} height="100%">
                {children}
            </Flex>
        </SecondaryWrapper>
    );
};

export const Button: ButtonType = {
    Primary,
    Secondary,
};
