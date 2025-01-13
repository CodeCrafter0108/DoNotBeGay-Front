import { Box } from '@/components/Box';
import { Flex, Text } from '@/styles/global';
import { Bar } from './styles';
import { useConfig } from '@/contexts/ConfigContext';

interface ProgressBarProps {
    sells: number;
    buys: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ sells, buys }) => {
    const {theme} = useConfig()
    const total = sells + buys;

    const sellsPercentage = (sells / total) * 100;
    const buysPercentage = (buys / total) * 100;

    return (
        <Box padding="12px 20px" overflow="none">
            <Flex justifyContent={'space-between'}>
                <Flex gap={0} flexDirection={'column'}>
                    <Text fontSize='16px' lineHeight='normal' color={theme.gray}>Buys</Text>
                    <Text fontSize='24px' lineHeight='normal' >{buys}</Text>
                </Flex>
                <Flex gap={0} flexDirection={'column'}>
                    <Text fontSize='16px' lineHeight='normal' color={theme.gray}>Sells</Text>
                    <Text fontSize='24px' lineHeight='normal' textAlign='end'>{sells}</Text>
                </Flex>
            </Flex>
            <Flex gap={0} height={'17px'} marginTop={'4px'}>
                <Bar color={theme.greenLight} width={buysPercentage} style={{borderTopLeftRadius: '3px', borderBottomLeftRadius: '3px'}}/>
                <Bar color={theme.redLight} width={sellsPercentage} style={{borderTopRightRadius: '3px', borderBottomRightRadius: '3px'}}/>
            </Flex>
        </Box>
    );
};
