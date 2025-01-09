import styled from 'styled-components';

export const TimeItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-width: 56px;
    border: 1px solid ${({ theme }) => theme.accent};
`;
