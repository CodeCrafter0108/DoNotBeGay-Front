import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Flex, Text } from '@/styles/global';
import { Buy } from './layout/Buy';
import { Sell } from './layout/Sell';
import { FormTabs } from './components/FormTabs/FormTabs';
import { useCallback, useState } from 'react';
import { TabsType } from './types';
import { Wrapper } from './styles';

export const Form = () => {
    const [activeTab, setActiveTab] = useState<TabsType>('buy');

    return (
        <Wrapper>
            <Box padding="16px 20px">
                <FormTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === 'buy' ? <Buy /> : <Sell />}
            </Box>
        </Wrapper>
    );
};
