import React, { useMemo, useState } from 'react';
import { Flex } from '@/styles/global';
import { Pagination } from '@/components/Pagination';
import { BalanceWrapper } from '@/app/tournament/components/TokenCircle/styles';
import { TokenCircleListProps } from '@/app/tournament/components/TokenCircle/types';
import { Show } from '@/components/Show';
import { ListItem } from './ListItem';

const PER_PAGE = 7;

export const List: React.FC<TokenCircleListProps> = ({ tokens, onSelect }) => {
    const [current, setCurrent] = useState(1);

    const handleNextPage = () => {
        setCurrent((prev) => (prev < totalPages ? prev + 1 : prev));
    };

    const handlePrevPage = () => {
        setCurrent((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const tokensWithBalance = useMemo(() => {
        if (!tokens) return [];
        return tokens.filter((t) => t.balanceRaw > 0n).sort((a, b) => Number(b.balanceUsd) - Number(a.balanceUsd));
    }, [tokens]);

    const totalPages = useMemo(() => {
        if (!tokensWithBalance || !tokensWithBalance.length) return 1;
        return Math.ceil(tokensWithBalance.length / PER_PAGE);
    }, [tokensWithBalance]);

    const filtered = useMemo(() => {
        if (!tokensWithBalance || !tokensWithBalance.length) return [];
        return tokensWithBalance.slice((current - 1) * PER_PAGE, current * PER_PAGE);
    }, [current, tokensWithBalance]);

    return (
        <Flex flexDirection="column" height="100%" paddingTop="30px">
            <Show.When isTrue={!!filtered.length}>
                <BalanceWrapper>
                    {filtered.map((token, index) => (
                        <ListItem key={index} token={token} index={(current - 1) * PER_PAGE + index + 1} onSelect={onSelect} />
                    ))}
                </BalanceWrapper>

                {/* Pagination */}
                <Pagination currentPage={current} totalPages={totalPages} onPrev={handlePrevPage} onNext={handleNextPage} />
            </Show.When>

            <Show.When isTrue={filtered.length === 0}>
                <Flex justifyContent="center" alignItems="center" height="100%" paddingBottom="30px">
                    No tokens found
                </Flex>
            </Show.When>
        </Flex>
    );
};
