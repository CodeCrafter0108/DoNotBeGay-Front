import React, { useMemo, useState } from 'react';
import { Box } from '@/components/Box';
import { FadeIn, Flex, Grid, Text } from '@/styles/global';
import { Input } from '@/components/Input';

import { Pagination } from '@/components/Pagination';
import { TokenPricesWrapper } from '@/app/tournament/components/TokenPrices/styles';
import { TokenPricesProps } from '@/app/tournament/components/TokenPrices/types';
import { Show } from '@/components/Show';
import { Loader } from '@/components/Loader';
import { TokenPricesItem } from './TokenPricesItem';

const PER_PAGE = 7;

export const TokenPrices: React.FC<TokenPricesProps> = ({ tokens, isLoading, onSelect }) => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleNextPage = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const sorted = useMemo(() => {
        if (!tokens || !tokens.length) return [];
        return [...tokens].sort((a, b) => {
            if (a.isAvailable && !b.isAvailable) return -1;
            if (!a.isAvailable && b.isAvailable) return 1;
            return Number(b.priceUSD) - Number(a.priceUSD);
        });
    }, [tokens]);

    const filtered = useMemo(() => {
        if (!sorted || !sorted.length) return [];
        const lowercasedSearch = search.toLowerCase();

        return sorted.filter((token) => token.name?.toLowerCase().includes(lowercasedSearch)).slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
    }, [currentPage, sorted, search]);

    const totalPages = useMemo(() => {
        if (!tokens || !tokens.length) return 1;
        const filteredTokens = tokens.filter((token) => token.name?.toLowerCase().includes(search.toLowerCase()));
        return Math.ceil(filteredTokens.length / PER_PAGE);
    }, [tokens, search]);

    return (
        <Box>
            <TokenPricesWrapper>
                {/* Title */}
                <Flex justifyContent="center">
                    <Text fontSize="28px">Token Prices</Text>
                </Flex>

                {/* Search */}
                <Flex>
                    <Input.Search value={search} onChange={setSearch} placeholder="Search" />
                </Flex>

                <Show.When isTrue={!isLoading}>
                    {/* List */}
                    <FadeIn>
                        <Flex flexDirection="column" height="100%" width="100%" gap={20}>
                            {filtered.map((token, index) => (
                                <TokenPricesItem key={index} token={token} index={(currentPage - 1) * PER_PAGE + index + 1} onSelect={() => onSelect(token)} />
                            ))}
                        </Flex>
                    </FadeIn>

                    {/* Pagination */}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPrev={handlePrevPage} onNext={handleNextPage} />
                </Show.When>

                <Show.When isTrue={isLoading}>
                    <Grid gap={20}>
                        <Loader.Skeleton height="26px" width="100%" />
                        <Loader.Skeleton height="26px" width="100%" />
                        <Loader.Skeleton height="26px" width="100%" />
                        <Loader.Skeleton height="26px" width="100%" />
                        <Loader.Skeleton height="26px" width="100%" />
                        <Loader.Skeleton height="26px" width="100%" />
                        <Loader.Skeleton height="26px" width="100%" />
                    </Grid>
                </Show.When>
            </TokenPricesWrapper>
        </Box>
    );
};
