export interface ToggleProps {
    title?: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

export interface ToggleContentProps {
    value: boolean;
}
