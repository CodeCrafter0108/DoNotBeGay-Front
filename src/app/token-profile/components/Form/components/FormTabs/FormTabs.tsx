import { Flex } from '@/styles/global';
import { Tab } from './styles';
import { TabsType } from '../../types';
import React from 'react';

interface FormTabsProps {
    activeTab: TabsType;
    setActiveTab: (tab: TabsType) => void;
}

export const FormTabs: React.FC<FormTabsProps> = ({ activeTab, setActiveTab }) => {
    return (
        <Flex gap={20} marginBottom={24}>
            <Tab role="button" active={activeTab === 'buy'} onClick={() => setActiveTab('buy')}>
                Buy
            </Tab>
            <Tab role="button" active={activeTab === 'sell'} onClick={() => setActiveTab('sell')}>
                Sell
            </Tab>
        </Flex>
    );
};
