import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DialogType, useDialog } from '@/contexts/DialogContext';
import { springDialogRight } from '@/common/animations';

import { DialogSuccess } from './DialogSuccess';
import { DialogError } from './DialogError';

import { DialogContent, Wrapper } from './styles';

export const Dialogs = () => {
    const { currentDialog, closeDialog } = useDialog();

    const renderDialog = () => {
        switch (currentDialog) {
            case DialogType.error:
                return (
                    <motion.div {...springDialogRight}>
                        <DialogContent>
                            <DialogError onClose={closeDialog} />
                        </DialogContent>
                    </motion.div>
                );
            case DialogType.success:
                return (
                    <motion.div {...springDialogRight}>
                        <DialogContent>
                            <DialogSuccess onClose={closeDialog} />
                        </DialogContent>
                    </motion.div>
                );
            case DialogType.warning:
                return <div>Warning</div>;
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            <Wrapper>{renderDialog()}</Wrapper>
        </AnimatePresence>
    );
};
