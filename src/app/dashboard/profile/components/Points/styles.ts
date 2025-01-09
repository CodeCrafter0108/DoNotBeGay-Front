import styled from 'styled-components';
import { PointsItemProps } from '@/app/dashboard/profile/components/Points/types';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(11, 1fr);
`;

export const PointsWrapper = styled(Wrapper)`
    height: 32px;
    background: #373320;
    border-radius: 4px;
    overflow: hidden;
`;

export const PointsHeaderWrapper = styled(Wrapper)`
    background: transparent;
`;

export const PointsWrapperHeaderItem = styled.div<PointsItemProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ active, theme }) => (active ? theme.accent : theme.gray)};
`;

export const PointsWrapperItem = styled.div<PointsItemProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    background: ${({ theme, active }) => (active ? theme.accent : '')};
    color: ${({ theme, active }) => (active ? theme.bg : theme.white)};

    transition: all 0.3s ease;
`;
