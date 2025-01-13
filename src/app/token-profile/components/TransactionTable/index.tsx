import React from 'react';
import { Flex, Grid, Text } from '@/styles/global';
import { useConfig } from '@/contexts/ConfigContext';
import { Show } from '@/components/Show';

import { SortSelector } from '@/components/SortSelector';
import { Breakpoints } from '@/styles/breakpoints';
import { Formatter } from '@/utils';
import { TableWrapper, TableWrapperContent, TableWrapperItem } from './styles';
import { Box } from '@/components/Box';

const mockData = [
    {
        data: '40s ago',
        type: 'Buy',
        usd: '$1,254.01',
        price: '$0.01',
        txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72',
    },
    {
        data: '40s ago',
        type: 'Sell',
        usd: '$1,254.01',
        price: '$0.01',
        txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72',
    },
    {
        data: '40s ago',
        type: 'Buy',
        usd: '$1,254.01',
        price: '$0.01',
        txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72',
    },
    {
        data: '40s ago',
        type: 'Sell',
        usd: '$1,254.01',
        price: '$0.01',
        txn: '0xd2533d7C809734d69C63DE4f4a5052a0FfC63E72',
    },
];

export const TransactionTable: React.FC = () => {
    const { theme } = useConfig();

    return (
        <Box padding="30px 40px" style={{ gridArea: 'transactions' }}>
            <Flex flexDirection={'column'} gap={20}>
                <Text fontSize="28px">Transaction</Text>
                <TableWrapper>
                    <Show.Toggle showAbove={Breakpoints.md}>
                        <TableWrapperContent>
                            <Flex alignItems="center">
                                <Text fontSize="18px" color={theme.gray}>
                                    Date
                                </Text>
                            </Flex>
                            <SortSelector text="Type" />
                            <SortSelector text="USD" />
                            <SortSelector text="Price" />
                            <SortSelector text="TXN" />
                        </TableWrapperContent>
                    </Show.Toggle>

                    <Grid gap={0}>
                        {mockData.map((transaction, index) => (
                            <TableWrapperItem key={index}>
                                <Flex alignItems="center" justifyContent="space-between">
                                    <Show.Toggle showBelow={Breakpoints.md}>
                                        <Text fontSize="18px" color={theme.gray}>
                                            Date
                                        </Text>
                                    </Show.Toggle>
                                    <Text fontSize="18px">{transaction.data}.</Text>
                                </Flex>

                                <Flex alignItems="center" justifyContent="space-between">
                                    <Show.Toggle showBelow={Breakpoints.md}>
                                        <Text fontSize="18px" color={theme.gray}>
                                            Type
                                        </Text>
                                    </Show.Toggle>
                                    <Text fontSize="18px" color={`${transaction.type === 'Buy' ? theme.greenLight : theme.redLight} !important`}>
                                        {transaction.type}
                                    </Text>
                                </Flex>

                                <Flex justifyContent="space-between">
                                    <Show.Toggle showBelow={Breakpoints.md}>
                                        <Text fontSize="18px" color={theme.gray}>
                                            USD
                                        </Text>
                                    </Show.Toggle>
                                    <Text fontSize="18px">{transaction.usd}</Text>
                                </Flex>

                                <Flex justifyContent="space-between">
                                    <Show.Toggle showBelow={Breakpoints.md}>
                                        <Text fontSize="18px" color={theme.gray}>
                                            Price
                                        </Text>
                                    </Show.Toggle>

                                    <Text fontSize="18px">{transaction.price}</Text>
                                </Flex>

                                <Flex justifyContent="space-between">
                                    <Show.Toggle showBelow={Breakpoints.md}>
                                        <Text fontSize="18px" color={theme.gray}>
                                            TXN
                                        </Text>
                                    </Show.Toggle>
                                    <Text fontSize="18px">{Formatter.formatAddress(transaction.txn)}</Text>
                                </Flex>
                            </TableWrapperItem>
                        ))}
                    </Grid>
                </TableWrapper>
            </Flex>
        </Box>
    );
};
