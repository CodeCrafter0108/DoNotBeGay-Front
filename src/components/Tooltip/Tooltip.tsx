import React, { createContext, useContext, useEffect, useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { tooltipStyles } from '@/styles/global';
import { v4 as uuidv4 } from 'uuid';

interface TooltipContextProps {
    id: string;
}

interface TooltipWrapperProps {
    children: React.ReactNode;
}

interface TooltipContentProps {
    children: React.ReactNode;
}

const TooltipContext = createContext<TooltipContextProps | undefined>(undefined);

export const Tooltip: React.FC<{ children: React.ReactNode }> & {
    Wrapper: React.FC<TooltipWrapperProps>;
    Content: React.FC<TooltipContentProps>;
} = ({ children }) => {
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        setId(uuidv4());
    }, []);

    if (!id) return null;

    return (
        <TooltipContext.Provider value={{ id }}>
            {children}
            <ReactTooltip id={id} style={tooltipStyles} />
        </TooltipContext.Provider>
    );
};

const TooltipWrapper = ({ children }: TooltipWrapperProps) => {
    const context = useContext(TooltipContext);

    if (!context) {
        throw new Error('Tooltip.Wrapper must be used within a Tooltip');
    }

    return (
        <div style={{ cursor: 'pointer' }} data-tooltip-id={context.id}>
            {children}
        </div>
    );
};

const TooltipContent = ({ children }: TooltipContentProps) => {
    const context = useContext(TooltipContext);

    if (!context) {
        throw new Error('Tooltip.Content must be used within a Tooltip');
    }

    return (
        <ReactTooltip id={context.id} style={tooltipStyles}>
            {children}
        </ReactTooltip>
    );
};

Tooltip.Wrapper = TooltipWrapper;
Tooltip.Content = TooltipContent;
