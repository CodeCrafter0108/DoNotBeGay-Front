import React, { useEffect, useState } from 'react';
import { Time, TimerProps } from '@/components/Timer/types';
import { Flex, Text } from '@/styles/global';
import { TimeItem } from '@/components/Timer/styles';

export const Timer: React.FC<TimerProps> = ({ timestamp }) => {
    const [time, setTime] = useState<Time>({
        days: `00`,
        hasDays: false,
        hours: `00`,
        minutes: `00`,
        seconds: `00`,
    });

    useEffect(() => {
        if (!timestamp) return;

        const timer = () => {
            const now = Date.now();
            const distance = now - Number(timestamp) * 1000;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTime({
                days: days < 10 ? `0${days}` : days,
                hasDays: days > 0,
                hours: hours < 10 ? `0${hours}` : hours,
                minutes: minutes < 10 ? `0${minutes}` : minutes,
                seconds: seconds < 10 ? `0${seconds}` : seconds,
            });
        };

        const interval = setInterval(() => timer(), 1000);
        timer();

        return () => clearInterval(interval);
    }, [timestamp]);

    return (
        <Flex>
            {time.hasDays && (
                <TimeItem>
                    <Text fontSize="33px" lineHeight="1">
                        {time.days}
                    </Text>
                    <Text fontSize="16px" lineHeight="1" color="#ffffff60">
                        d
                    </Text>
                </TimeItem>
            )}

            <TimeItem>
                <Text fontSize="33px" lineHeight="1">
                    {time.hours}
                </Text>
                <Text fontSize="16px" lineHeight="1" color="#ffffff60">
                    h
                </Text>
            </TimeItem>

            <TimeItem>
                <Text fontSize="33px" lineHeight="1">
                    {time.minutes}
                </Text>
                <Text fontSize="16px" lineHeight="1" color="#ffffff60">
                    m
                </Text>
            </TimeItem>

            {!time.hasDays && (
                <TimeItem>
                    <Text fontSize="33px" lineHeight="1">
                        {time.seconds}
                    </Text>
                    <Text fontSize="16px" lineHeight="1" color="#ffffff60">
                        s
                    </Text>
                </TimeItem>
            )}
        </Flex>
    );
};
