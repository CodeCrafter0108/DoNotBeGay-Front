import { IToken } from '@/types/tournament';

export interface ModalMigrateProps {}

export interface ModalMigrateDefaultProps {
    token: IToken;
    onCancel: () => void;
    onMigrate: () => void;
    onApprove: () => void;
}

export interface ModalMigrateSuccessProps {
    token: IToken;
    onCancel: () => void;
    onTrade: () => void;
}

export interface ModalMigrateErrorProps {
    onCancel: () => void;
}

export enum MigrateState {
    DEFAULT, // Default state
    SUCCESS, // Migration success
    ERROR, // Migration error
    PROCESSING, // Migration processing
}

export enum MigrateProcessType {
    APPROVE,
    MIGRATE,
}
