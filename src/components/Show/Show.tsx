import React, { ReactNode, useEffect, useState } from 'react';
import { Breakpoints } from '@/styles/breakpoints';

interface ShowProps {
    children: ReactNode;
}

interface WhenProps {
    isTrue: boolean | undefined;
    children: ReactNode;
}

interface ElseProps {
    render?: ReactNode;
    children: ReactNode;
}

interface ToggleProps {
    showAbove?: Breakpoints;
    showBelow?: Breakpoints;
    children: ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ showAbove, showBelow, children }) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQueryAbove = showAbove ? window.matchMedia(`(min-width: ${showAbove})`) : null;
        const mediaQueryBelow = showBelow ? window.matchMedia(`(max-width: ${showBelow})`) : null;

        const updateMatches = () => {
            const matchesAbove = mediaQueryAbove ? mediaQueryAbove.matches : true;
            const matchesBelow = mediaQueryBelow ? mediaQueryBelow.matches : true;
            setMatches(matchesAbove && matchesBelow);
        };

        updateMatches();

        if (mediaQueryAbove) {
            mediaQueryAbove.addEventListener('change', updateMatches);
        }
        if (mediaQueryBelow) {
            mediaQueryBelow.addEventListener('change', updateMatches);
        }

        return () => {
            if (mediaQueryAbove) {
                mediaQueryAbove.removeEventListener('change', updateMatches);
            }
            if (mediaQueryBelow) {
                mediaQueryBelow.removeEventListener('change', updateMatches);
            }
        };
    }, [showAbove, showBelow]);

    return matches ? <>{children}</> : null;
};

export const Show: React.FC<ShowProps> & {
    When: React.FC<WhenProps>;
    Else: React.FC<ElseProps>;
    Toggle: React.FC<ToggleProps>;
} = (props) => {
    let when: React.ReactElement | null = null;
    let otherwise: React.ReactElement | null = null;

    if (props.children) {
        React.Children.forEach(props.children as React.ReactElement, (child: React.ReactElement) => {
            if (child.props.isTrue === undefined) {
                otherwise = child;
            } else if (!when && child.props.isTrue === true) {
                when = child;
            }
        });
    }

    return when || otherwise;
};

Show.When = ({ isTrue, children }: WhenProps) => isTrue && children;
Show.Else = ({ render, children }: ElseProps) => render || children;
Show.Toggle = Toggle;
