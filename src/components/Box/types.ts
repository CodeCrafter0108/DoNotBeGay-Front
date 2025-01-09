import React from 'react';

type PixelatedCorner = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface BoxProps {
    children?: React.ReactNode;
    width?: string;
    height?: string;
    radius?: string;
    padding?: string;
    backgroundColor?: string;
    overflow?: string;
    pixelatedCorners?: PixelatedCorner[];
}

export type BoxWrapperProps = Partial<BoxProps>;
