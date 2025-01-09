import styled from 'styled-components';
import { RangeSliderProps } from '@/components/Range/types';

export const RangeWrapper = styled.div`
    font-size: 18px;
    width: 100%;
`;

export const RangeSlider = styled.div<RangeSliderProps>`
    height: 21px;
    background: #d9d9d90d;
    border-radius: 3px;
    position: relative;
    color: ${({ theme }) => theme.bg};

    &::after {
        content: ${({ value }) => (value ? `'${value}'` : "''")};
        width: ${({ percent }) => percent}%;
        height: 100%;
        background: ${({ theme }) => theme.accent};
        border-radius: 3px;
        position: absolute;
        top: 0;
        left: 0;

        transition: width 0.2s;

        display: flex;
        justify-content: flex-end;
        padding-right: 4px;
    }
`;

export const RangeSliderValue = styled.div``;
