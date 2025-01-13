import { Box } from '@/components/Box';
import { Flex, Text } from '@/styles/global';

const mockData: { holder: string; percentage: number }[] = [
    { holder: 'Sith', percentage: 8.32 },
    { holder: 'Sith', percentage: 8.32 },
    { holder: 'Sith', percentage: 8.32 },
    { holder: 'Sith', percentage: 8.32 },
    { holder: 'Sith', percentage: 8.32 },
    { holder: 'Sith', percentage: 8.32 },
    { holder: 'Sith', percentage: 8.32 },
    { holder: 'Sith', percentage: 8.32 },
    { holder: 'Sith', percentage: 8.32 },
    { holder: 'Sith', percentage: 8.32 },
];

export const HolderDistribution: React.FC = () => {
    return (
        <Box padding="20px 24px" overflow="none" style={{ gridArea: 'distribution' }}>
            <Flex flexDirection={'column'} gap={20}>
                <Text fontSize="28px" lineHeight="1">
                    Holder Distribution
                </Text>
                {mockData.map((item, index) => (
                    <Flex flexDirection={'row'} justifyContent={'space-between'} key={index}>
                        <Flex gap={2}>
                            <Text fontSize="20px" lineHeight="1" width="20px">
                                {index + 1}.
                            </Text>
                            <Text fontSize="20px" lineHeight="1">
                                {item.holder}
                            </Text>
                        </Flex>
                        <Text fontSize="20px" lineHeight="1">
                            {item.percentage}%
                        </Text>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};
