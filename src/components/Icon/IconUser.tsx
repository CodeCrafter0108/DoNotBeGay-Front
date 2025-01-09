import React from 'react';
import { useAccount } from 'wagmi';
import { UserIconProps } from './types';
import { CircleImageWithFallback } from '../Image/Image';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { DEFAULT_ICON_SIZE } from './config';

// IconUser component for displaying the user icon (avatar or jazzicon)
export const IconUser: React.FC<UserIconProps> = ({ size = DEFAULT_ICON_SIZE, user }) => {
    const { address } = useAccount();

    return (
        <>
            {user && user.avatar && <CircleImageWithFallback size={size} src={user.avatar} key={user.name} />}
            {user && !user.avatar && address && <Jazzicon diameter={size} seed={jsNumberForAddress(address)} />}
        </>
    );
};
