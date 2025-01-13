import styled from 'styled-components';

export const PageHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;

    @media screen and (min-width: 1200px) {
        flex-direction: row;
    }
`;

export const PageContent = styled.div`
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
    grid-template-areas:
        'chart'
        'info'
        'distribution'
        'transactions';

    @media screen and (min-width: 1200px) {
        grid-template-columns: 2fr 1fr;

        grid-template-areas:
            'chart info'
            'transactions distribution';
    }
`;