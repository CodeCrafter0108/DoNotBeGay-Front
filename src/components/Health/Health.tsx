'use client';

import React, { useEffect, useState } from 'react';
import { HealthWrapper } from './styles';
import { apiClient } from '@/config/api';

export const Health: React.FC = () => {
    const [alive, setAlive] = useState<boolean>(true);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const { data } = await apiClient.health();

                if (data.status === 'ok') setAlive(true);
                else setAlive(false);
            } catch (error) {
                setAlive(false);
            }
        };

        const interval = setInterval(checkHealth, 10_000);

        return () => clearInterval(interval);
    }, []);

    return <HealthWrapper alive={alive} />;
};
