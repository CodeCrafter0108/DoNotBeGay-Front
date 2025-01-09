'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

const AUTO_CLOSE_DELAY = 5_000;

export enum DialogType {
    error = 'error',
    warning = 'warning',
    success = 'success',
}

interface DialogContextType {
    currentDialog: DialogType | null;
    dialogText: string;
    showDialog: (type: DialogType, text: string, autoClose?: boolean) => void;
    closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
    const [currentDialog, setCurrentDialog] = useState<DialogType | null>(null);
    const [dialogText, setDialogText] = useState<string>('');

    const showDialog = (dialog: DialogType, text: string, autoClose = false) => {
        setCurrentDialog(dialog);
        setDialogText(text);

        if (autoClose) {
            setTimeout(() => closeDialog(), AUTO_CLOSE_DELAY);
        }
    };
    const closeDialog = () => {
        setCurrentDialog(null);
    };

    return <DialogContext.Provider value={{ currentDialog, dialogText, showDialog, closeDialog }}>{children}</DialogContext.Provider>;
};

export const useDialog = () => {
    const context = useContext<DialogContextType | undefined>(DialogContext);
    if (context === undefined) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};
