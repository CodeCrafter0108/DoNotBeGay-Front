import React from 'react';

export interface Props {
    children: React.ReactNode;
    disabled?: boolean;
    active?: boolean;
    width?: string;
    height?: string;
    radius?: string;
    small?: boolean;
    onClick?: () => void;
}

export type ButtonWrapperProps = Partial<Props>;

export type ButtonType = {
    Primary: React.FC<Props>;
    Secondary: React.FC<Props>;
};
