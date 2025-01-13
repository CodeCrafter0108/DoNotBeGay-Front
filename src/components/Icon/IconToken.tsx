import React from 'react';
import { IconTokenType, TokenIconProps, TokenPrimaryProps } from '@/components/Icon/types';
import { Absolute, Flex } from '@/styles/global';

import WrapperIconPrimary from './wrappers/token-wrapper-primary.svg';
import { IconTokenPrimaryWrapper, IconTokenRemoteWrapper } from './styles';
import { ImageWithFallback } from '@/components/Image';

const IconTokenPrimary: React.FC<TokenPrimaryProps> = ({ state, path, size = 35, sizeWrapperIcon = 65 }) => {
    return (
        <Flex alignItems="center" justifyContent="center">
            <IconTokenPrimaryWrapper state={state}>
                <WrapperIconPrimary width={sizeWrapperIcon} height={sizeWrapperIcon} />
            </IconTokenPrimaryWrapper>
            <Absolute>
                <ImageWithFallback size={size} src={`${path}`} radius="50%" />
            </Absolute>
        </Flex>
    );
};

const IconTokenRemote: React.FC<TokenIconProps> = ({ path, size = 35 }) => {
    return (
        <Flex>
            <IconTokenRemoteWrapper size={size}>
                <ImageWithFallback size={size} src={`${path}`} radius="50%" />
            </IconTokenRemoteWrapper>
        </Flex>
    );
};

export const IconToken: IconTokenType = {
    Primary: IconTokenPrimary,
    Remote: IconTokenRemote,
};
