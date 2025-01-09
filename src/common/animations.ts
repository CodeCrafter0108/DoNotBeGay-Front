interface Animation {
    transition: {
        type: string;
        stiffness: number;
        damping: number;
    };
    initial: { [key: string]: number | string };
    animate: { [key: string]: number | string };
    exit: { [key: string]: number | string };
}

export const springToTop = {
    transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
    },
    initial: { y: '-60px', height: '100%', opacity: 0 },
    animate: { y: 0, height: '100%', opacity: 1 },
    exit: { opacity: 0 },
} as Animation;

export const springToBottom = {
    transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
    },
    initial: { y: '60px', height: '100svh', opacity: 0 },
    animate: { y: 0, height: '100svh', opacity: 1 },
    exit: { opacity: 0 },
} as Animation;

export const springToRight = {
    transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
    },
    initial: { x: '-80px', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
} as Animation;

export const springToLeft = {
    transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
    },
    initial: { x: '80px', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
} as Animation;

export const springOpacity = {
    transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
    },
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
} as Animation;

export const springPopup = {
    transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
    },
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
} as Animation;

export const springDialogRight = {
    transition: {
        type: 'spring',
        stiffness: 700,
        damping: 35,
    },
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
} as Animation;

export const springZoomIn = {
    transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
    },
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
} as Animation;
