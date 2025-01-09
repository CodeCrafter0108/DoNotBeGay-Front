import React from 'react';
import { ChainId } from '@/config/constants';
import { PairState, User } from '@/types';
import { Connector } from 'wagmi';

export type IconType = {
    User: React.FC<UserIconProps>;
    Connector: React.FC<ConnectorIconProps>;
    Chain: React.FC<ChainIconProps>;
    Svg: React.FC<SvgIconProps>;
    SvgRemote: React.FC<SvgIconRemoteProps>;
    Token: IconTokenType;
};

export type IconTokenType = {
    Primary: React.FC<TokenPrimaryProps>;
    Remote: React.FC<TokenIconProps>;
};

export type BaseIconProps = {
    size?: number;
    cursor?: string;
    onClick?: () => void;
};

export type UserIconProps = BaseIconProps & {
    user?: User | null;
};

export type ConnectorIconProps = BaseIconProps & {
    connector: Connector;
};

export type ChainIconProps = BaseIconProps & {
    chainId?: ChainId;
};

export type SvgIconProps = BaseIconProps & {
    name: string;
    opacity?: number;
    disabled?: boolean;
};

export interface SvgIconRemoteProps {
    src: string;
    size?: string;
    color?: string;
    strokeColor?: string;
}

export type TokenIconProps = BaseIconProps & {
    path: string;
    size?: number;
};

export type TokenPrimaryProps = BaseIconProps & {
    path: string;
    size?: number;
    state: PairState;
};

export type IconSvgWrapperProps = Partial<SvgIconProps>;

export type IconTokenPrimaryWrapperProps = BaseIconProps & {
    state?: PairState;
};

export interface RemoteSvgWrapperProps {
    size?: string;
    color?: string;
    strokeColor?: string;
}
