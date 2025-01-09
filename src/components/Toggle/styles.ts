import styled from 'styled-components';
import { ToggleContentProps } from '@/components/Toggle/types';

export const ToggleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

export const ToggleContent = styled.div<ToggleContentProps>`
    width: 34px;
    height: 12px;
    background: ${({ theme, value }) => (value ? theme.accent : '#363936')};
    position: relative;
    border-radius: 2px;

    display: flex;
    align-items: center;
    cursor: pointer;

    transition: all 0.3s ease;

    &::before {
        content: '';
        position: absolute;
        width: 17px;
        height: 17px;
        background: white;
        transition: inherit;
        border-radius: 4px;

        transform: ${({ value }) => (value ? 'translateX(17px)' : 'translateX(0)')};
        box-shadow: ${({ value }) => (value ? '-1px -1px 0px 0px #0000007D' : '1px 1px 0px 0px #0000007D')};
    }
`;
