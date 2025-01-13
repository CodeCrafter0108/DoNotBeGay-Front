import { Box } from '@/components/Box';
import { Flex, Text } from '@/styles/global';
import { useConfig } from '@/contexts/ConfigContext';
import { ProgressBar } from './components/ProgressBar';

export const TokenInfo: React.FC = () => {
    const { theme } = useConfig();
    return (
        <Flex flexDirection={'column'} gap={12} style={{ gridArea: 'info' }}>
            <Flex gap={12}>
                <Box padding="12px 32px" overflow="none" width='100%'>
                    <Flex flexDirection={'column'} gap={4} alignItems={'center'}>
                        <Text fontSize="20px" lineHeight="1">
                            Price USD
                        </Text>
                        <Text fontSize="24px" lineHeight="1" color={theme.accent}>
                            $1,254.01
                        </Text>
                    </Flex>
                </Box>
                <Box padding="12px 32px" overflow="none" width='100%'>
                    <Flex flexDirection={'column'} gap={4} alignItems={'center'}>
                        <Text fontSize="20px" lineHeight="1">
                            Liquidity
                        </Text>
                        <Text fontSize="24px" lineHeight="1" color={theme.accent}>
                            $1,254.01
                        </Text>
                    </Flex>
                </Box>
            </Flex>
            <Flex gap={12}>
                <Box padding="12px 32px" overflow="none" width='100%'>
                    <Flex flexDirection={'column'} gap={4} alignItems={'center'}>
                        <Text fontSize="20px" lineHeight="1">
                            FDV
                        </Text>
                        <Text fontSize="24px" lineHeight="1" color={theme.accent}>
                            $1,254.01
                        </Text>
                    </Flex>
                </Box>
                <Box padding="12px 32px" overflow="none" width='100%'>
                    <Flex flexDirection={'column'} gap={4} alignItems={'center'}>
                        <Text fontSize="20px" lineHeight="1">
                            Market cap
                        </Text>
                        <Text fontSize="24px" lineHeight="1" color={theme.accent}>
                            $1,254.01
                        </Text>
                    </Flex>
                </Box>
            </Flex>
            <Box padding="12px 32px" overflow="none">
                <Flex flexDirection={'column'} gap={4} alignItems={'center'}>
                    <Text fontSize="20px" lineHeight="1">
                        Price
                    </Text>
                    <Flex justifyContent={'space-between'} width={'100%'}>
                        <Flex flexDirection={'column'} alignItems={'center'} gap={0}>
                            <Text fontSize="20px" lineHeight="1">
                                1H
                            </Text>
                            <Text fontSize="24px" lineHeight="1" color={theme.redLight}>
                                -11.03%
                            </Text>
                        </Flex>
                        <Flex flexDirection={'column'} alignItems={'center'} gap={0}>
                            <Text fontSize="20px" lineHeight="1">
                                1D
                            </Text>
                            <Text fontSize="24px" lineHeight="1" color={theme.greenLight}>
                                +1.11%
                            </Text>
                        </Flex>
                        <Flex flexDirection={'column'} alignItems={'center'} gap={0}>
                            <Text fontSize="20px" lineHeight="1">
                                1W
                            </Text>
                            <Text fontSize="24px" lineHeight="1" color={theme.greenLight}>
                                +1.11%
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Box padding="12px 32px" overflow="none">
                <Flex flexDirection={'column'} gap={4} alignItems={'center'}>
                    <Flex flexDirection={'column'} alignItems={'center'} gap={0}>
                        <Text fontSize="20px" lineHeight="1">
                            Trading volume (24h)
                        </Text>
                        <Text fontSize="24px" lineHeight="1" color={theme.accent}>
                            $1,254.01
                        </Text>
                    </Flex>
                </Flex>
            </Box>
            <ProgressBar sells={100} buys={200} />
        </Flex>
    );
};
