import React, { useMemo } from 'react';
import { TokenSelectIcon, TokenSelectWrapper } from '@/components/TokenSelect/styles';
import { Flex } from '@/styles/global';
import { Icon } from '@/components/Icon';
import { TokenSelectProps } from '@/components/TokenSelect/types';
import { Loader } from '../Loader';

import { useActiveChainId } from '@/hooks/useActiveChainId';
import { ImageWithFallback } from '@/components/Image';

export const TokenSelect: React.FC<TokenSelectProps> = ({ token, valueType, selectable = true, onSelect }) => {
    const { chainId } = useActiveChainId();

    const imageUrl = useMemo(() => {
        if (!token) return '';
        if (token.isNative) return `/img/tokens/${chainId}.svg`;
        return token.imageUrl;
    }, [token, chainId]);

    const handleSelect = () => {
        if (!onSelect || typeof valueType === 'undefined') return;
        onSelect(valueType);
    };

    return (
        <TokenSelectWrapper>
            <Flex alignItems="center" height="100%" onClick={handleSelect}>
                <Flex alignItems="center" gap={5}>
                    {token && <ImageWithFallback size={24} src={imageUrl} radius="50%" />}
                    {token && (
                        <Flex alignItems="center" gap={5}>
                            {token.symbol}
                        </Flex>
                    )}
                    {!token && <Loader.Skeleton width="40px" height="20px" />}
                </Flex>

                {selectable && (
                    <TokenSelectIcon isOpened={false}>
                        <Icon.Svg name="chevron-down" size={20} />
                    </TokenSelectIcon>
                )}
            </Flex>
        </TokenSelectWrapper>
    );
};
