import ReactEcharts from 'echarts-for-react';
import styled from 'styled-components';

export const StyledChart = styled(ReactEcharts)`
    width: 100%;
    border-radius: 12px;
    min-height: 450px;
    padding: 25px 0 16px 0;
    background-color: ${({ theme }) => theme.bg};

    @media screen and (min-width: 1200px) {
        min-height: 100%;
    }
`;
