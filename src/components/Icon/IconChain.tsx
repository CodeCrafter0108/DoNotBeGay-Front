import React from 'react';
import { ChainIconProps } from './types';
import { DEFAULT_ICON_SIZE } from './config';
import { ImageWithFallback } from '../Image';

export const IconChain: React.FC<ChainIconProps> = ({ size = DEFAULT_ICON_SIZE, chainId }) => {
    return <ImageWithFallback size={size} src={`/img/chains/${chainId}.svg`} radius="50%" />;
};
