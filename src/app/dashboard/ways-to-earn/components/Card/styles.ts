import styled from 'styled-components';

export const CardWrapper = styled.div`
    height: 270px;
    background: ${({ theme }) => theme.bg};
    border-radius: 12px;
    padding: 24px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
`;
