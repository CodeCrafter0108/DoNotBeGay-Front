import styled from 'styled-components';
import { ButtonWrapperProps } from '@/components/Button/types';

const Wrapper = styled.div<ButtonWrapperProps>`
    border-radius: ${({ radius }) => radius || '4px'};
    box-shadow: 4px 4px 0 0 #0000008c;

    width: ${({ width }) => width || 'max-content'};
    height: ${({ height, small }) => (small ? '32px' : height || '44px')};
    padding: ${({ small }) => (small ? '0 8px' : '0 16px')};

    cursor: pointer;
    transition: all 0.2s ease;

    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    user-select: none;
`;

export const PrimaryWrapper = styled(Wrapper)`
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.black};
    border: 1px solid transparent;

    &:hover {
        background: ${({ theme }) => theme.hover};
    }
`;

export const SecondaryWrapper = styled(Wrapper)`
    background: ${({ theme, active }) => (active ? theme.accent : theme.bg)};
    color: ${({ theme, active }) => (active ? theme.black : theme.accent)};
    border: 1px solid ${({ theme }) => theme.accent};

    &:hover {
        opacity: 0.75;
    }
`;
