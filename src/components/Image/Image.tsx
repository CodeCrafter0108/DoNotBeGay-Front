import React, { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { CircledImageWrapper, ImageWrapper } from '@/components/Image/styles';
import { Show } from '../Show';
import { Loader } from '../Loader';

const DEFAULT_FALLBACK_SRC = '/img/icons/unknown.svg';

interface ImageWithFallbackProps {
    size: number;
    src: string;
    fallbackSrc?: string;
    background?: string;
    radius?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ size, src, radius, fallbackSrc = DEFAULT_FALLBACK_SRC, background = 'transparent' }) => {
    const [img, setImg] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = src;

        image.onload = () => {
            setIsError(false);
            setIsLoading(false);
            setImg(src);
        };

        image.onerror = () => {
            setIsError(true);
            setIsLoading(false);
            setImg(fallbackSrc);
        };

        return () => {
            image.onload = null;
            image.onerror = null;
        };
    }, [src, fallbackSrc]);

    return (
        <ImageWrapper size={size} background={background}>
            <Show.When isTrue={!isError && !isLoading}>
                <NextImage src={img} alt="" width={size} height={size} style={{ borderRadius: `${radius || ''}` }} />
            </Show.When>

            <Show.When isTrue={isError && !isLoading}>
                <NextImage src={fallbackSrc} alt="" width={size} height={size} style={{ borderRadius: `${radius || ''}` }} />
            </Show.When>

            <Show.When isTrue={isLoading}>
                <Loader.Skeleton width={`${size}px`} height={`${size}px`} borderRadius="50%" />
            </Show.When>
        </ImageWrapper>
    );
};

export const CircleImageWithFallback: React.FC<ImageWithFallbackProps> = ({ size, src, fallbackSrc = DEFAULT_FALLBACK_SRC }) => {
    return (
        <CircledImageWrapper size={size}>
            <ImageWithFallback size={size} src={src} fallbackSrc={fallbackSrc} />
        </CircledImageWrapper>
    );
};
