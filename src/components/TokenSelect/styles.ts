import styled from 'styled-components';

export const TokenSelectWrapper = styled.div`
    position: relative;
    border-radius: 4px;
    box-shadow: 2px 2px 0 0 #0000008c;
    height: 32px;

    cursor: pointer;
    transition: all 0.2s ease;

    user-select: none;

    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.bg};
    padding: 0 10px;
`;

export const TokenSelectIcon = styled.div<{ isOpened?: boolean }>`
    transform: rotate(${({ isOpened }) => (isOpened ? '180deg' : '0deg')});
    transition: all 0.2s ease;
`;
