import React, { createContext, useContext, ReactNode } from 'react';
import { ProjectConfig } from '@/types';
import { config } from '@/config/project';
import { ThemeProvider } from 'styled-components';

const ConfigContext = createContext<ProjectConfig>({} as ProjectConfig);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ConfigContext.Provider value={config!}>
            <ThemeProvider theme={config!.theme}>{children}</ThemeProvider>
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    return useContext(ConfigContext);
};
