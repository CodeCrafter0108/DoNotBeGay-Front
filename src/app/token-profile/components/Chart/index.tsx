import { useConfig } from '@/contexts/ConfigContext';
import { StyledChart } from './styles';
import { jersey15 } from '@/styles/fonts';
import { useEffect, useRef } from 'react';
import EChartsReact from 'echarts-for-react';

export const Chart = () => {
    const { theme } = useConfig();
    const chartRef = useRef<EChartsReact | null>(null);

    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.getEchartsInstance().resize();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const option = {
        title: {
            text: 'Chart name',
            left: '35px',
            top: '5px',
            textStyle: {
                color: theme.white,
                fontSize: '28px',
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: '0.5px',
                fontFamily: jersey15.style.fontFamily,
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: theme.accent,
                    fontFamily: jersey15.style.fontFamily,
                    fontSize: '16px',
                },
            },
            backgroundColor: '#323232',
            borderColor: 'transparent',
            textStyle: {
                color: theme.white,
                fontSize: '18px',
                fontFamily: jersey15.style.fontFamily,
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['2000', '2001', '2002', '2003', '2004', '2005'],
                axisLabel: {
                    color: theme.white,
                    fontSize: '14px',
                    fontFamily: jersey15.style.fontFamily,
                },
            },
        ],
        yAxis: [
            {
                type: 'value',
                max: 200,
                interval: 25,
                axisLabel: {
                    color: theme.white,
                    fontSize: '14px',
                    fontFamily: jersey15.style.fontFamily,
                },
            },
        ],
        series: [
            {
                name: 'Test1',
                data: [0, 60, 60, 90, 150, 30],
                type: 'line',
                areaStyle: {},
                color: theme.gray,
                lineStyle: {
                    width: 4,
                },
                symbolSize: 0,
            },
            {
                name: 'Test2',
                data: [0, 30, 125, 60, 60, 45],
                type: 'line',
                areaStyle: {},
                color: theme.accent,
                lineStyle: {
                    width: 4,
                },
                symbolSize: 0,
            },
        ],
    };
    return <StyledChart option={option} lazyUpdate={true} ref={chartRef} style={{ gridArea: 'chart' }} />;
};
