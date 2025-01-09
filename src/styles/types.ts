import { HTMLAttributes } from 'react';
import { BackgroundProps, ColorProps, FlexboxProps, LayoutProps, PositionProps, SpaceProps, GridProps as _GridProps, BorderProps } from 'styled-system';

export interface BoxProps extends BackgroundProps, LayoutProps, PositionProps, BorderProps, SpaceProps, Omit<ColorProps, 'color'>, HTMLAttributes<HTMLElement> {}

export interface FlexProps extends BoxProps, FlexboxProps {
    gap?: number;
    borderRadius?: string;
}

export interface GridProps extends FlexProps, _GridProps {
    gap?: number;
    padding?: string;
}

export interface TextProps extends BoxProps {
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    fontFamily?: string;
    letterSpacing?: string;
    textAlign?: string;
    color?: string;
    wrap?: string;
    height?: string;
    glow?: boolean;
    glowColor?: string;
    stroke?: boolean;
    strokeColor?: string;
    uppercase?: boolean;
    selectable?: boolean;
    tabular?: boolean;
}

export interface FadeInProps {
    height?: string;
    delay?: string;
    duration?: number;
}

export interface AbsoluteProps {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    zIndex?: number;
    width?: string;
    height?: string;
}

export interface ContainerProps {
    paddingMobile?: string;
}

export interface PageContainerProps {
    height?: string;
}
