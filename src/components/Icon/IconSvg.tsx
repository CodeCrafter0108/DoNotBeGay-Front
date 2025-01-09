import React, { useEffect, useState } from 'react';
import { SvgIconProps, SvgIconRemoteProps } from './types';
import { DEFAULT_ICON_SIZE } from './config';
import { ImageWithFallback } from '../Image';
import { IconSvgWrapper, RemoteSvgWrapper } from '@/components/Icon/styles';

export const IconSvg: React.FC<SvgIconProps> = ({ name, opacity, cursor, disabled, size = DEFAULT_ICON_SIZE, onClick }) => {
    return (
        <IconSvgWrapper opacity={opacity} disabled={disabled} cursor={cursor} onClick={onClick}>
            <ImageWithFallback size={size} src={`/img/icons/${name}.svg`} />
        </IconSvgWrapper>
    );
};

export const IconSvgRemote: React.FC<SvgIconRemoteProps> = ({ src, size, color, strokeColor }) => {
    const [svgContent, setSvgContent] = useState('');

    useEffect(() => {
        const fetchSVG = async () => {
            try {
                const response = await fetch(src);
                const text = await response.text();
                setSvgContent(text);
            } catch (error) {
                console.error('Error fetching SVG:', error);
            }
        };

        fetchSVG().catch(console.error);
    }, [src]);

    return (
        <RemoteSvgWrapper size={size} color={color} strokeColor={strokeColor}>
            <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        </RemoteSvgWrapper>
    );
};
