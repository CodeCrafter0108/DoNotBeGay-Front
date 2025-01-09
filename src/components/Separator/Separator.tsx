import React from 'react';
import { Wrapper } from '@/components/Separator/styles';
import { SeparatorProps } from '@/components/Separator/types';

export const Separator: React.FC<SeparatorProps> = ({ vertical, color, opacity = 1 }) => {
    return <Wrapper vertical={vertical} opacity={opacity} color={color}></Wrapper>;
};
