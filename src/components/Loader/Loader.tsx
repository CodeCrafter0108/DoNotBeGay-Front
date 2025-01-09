import React from 'react';
import { DotsWrapper, LoaderTextWrapper, SkeletonWrapper } from './styles';
import { DotsProps, LoaderType, SkeletonProps, TextProps } from './types';

const Dots: React.FC<DotsProps> = ({ count = 4, color }) => {
    return (
        <DotsWrapper count={count} color={color}>
            {[...Array(count)].map((_, index) => (
                <span key={index} />
            ))}
        </DotsWrapper>
    );
};

const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = '100%', borderRadius = '4px' }) => {
    return <SkeletonWrapper style={{ width, height, minWidth: width, maxWidth: width, borderRadius }} />;
};

const Text: React.FC<TextProps> = ({ text, fontSize, color, dotsCount = 3 }) => {
    return (
        <LoaderTextWrapper style={{ fontSize, color }} dotsCount={dotsCount}>
            {text}
            {[...Array(dotsCount)].map((_, index) => (
                <span key={index}>.</span>
            ))}
        </LoaderTextWrapper>
    );
};

export const Loader: LoaderType = {
    Dots,
    Skeleton,
    Text,
};
