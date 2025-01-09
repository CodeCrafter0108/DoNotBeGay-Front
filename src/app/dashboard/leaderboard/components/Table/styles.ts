import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';

export const TableWrapper = styled.div`
    display: grid;
    width: 100%;
    gap: 10px;
`;

export const TableWrapperContent = styled.div`
    display: grid;
    grid-template-columns: 60px 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;

    @media screen and (max-width: ${Breakpoints.md}) {
        grid-template-columns: 1fr;
        gap: 10px;
    }
`;

export const TableWrapperItem = styled(TableWrapperContent)<{ active?: boolean }>`
    border-bottom: 1px solid ${({ theme }) => theme.disabled};
    padding: 25px 0;

    * {
        color: ${({ theme, active }) => (active ? theme.accent : '#fff')};
    }
`;

export const TableItemRow = styled.div`
    display: flex;
`;

export const TableItemRowPoints = styled(TableItemRow)`
    flex-direction: column;

    @media screen and (width < ${Breakpoints.md}) {
        align-items: flex-end;
    }
`;
