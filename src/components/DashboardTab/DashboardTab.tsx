import React from 'react';
import { DashboardTabProps } from './types';
import { DashboardTabWrapper } from './styles';

export const DashboardTab: React.FC<DashboardTabProps> = ({ active, children, onClick }) => {
    return (
        <DashboardTabWrapper active={active} onClick={onClick}>
            {children}
        </DashboardTabWrapper>
    );
};
