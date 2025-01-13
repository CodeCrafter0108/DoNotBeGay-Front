import styled from 'styled-components';

export const Tab = styled.div<{ active: boolean }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    font-size: 20px;
    color: ${({ active, theme }) => (active ? theme.bg : theme.gray)};
    background-color: ${({ active, theme }) => (active ? theme.accent : 'transparent')};
    border-radius: 4px;
    font-size: 20px;
    transition: all 0.2s ease;
    cursor: pointer;
`;
