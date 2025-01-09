export interface DashboardTabProps {
    active?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

export interface DashboardTabWrapperProps {
    active?: boolean;
}
