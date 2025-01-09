import React from 'react';

export interface SkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
}

export interface DotsProps {
    count?: number;
    color?: string;
}

export interface TextProps {
    text: string;
    fontSize?: string;
    color?: string;
    dotsCount?: number;
}

export type LoaderType = {
    Dots: React.FC<DotsProps>;
    Skeleton: React.FC<SkeletonProps>;
    Text: React.FC<TextProps>;
};
