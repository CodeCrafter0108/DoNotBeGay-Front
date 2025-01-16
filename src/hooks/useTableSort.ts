import { SortType } from '@/components/SortSelector';
import { useCallback, useMemo, useState } from 'react';

interface UseTableArgs<T> {
    data: T[];
}

export const useTableSort = <T>({ data }: UseTableArgs<T>) => {
    const [sortConfig, setSortConfig] = useState<{
        key: keyof T | null;
        direction: SortType;
    }>({
        key: null,
        direction: SortType.NONE,
    });

    const sortedData = useMemo(
        () =>
            [...data].sort((a, b) => {
                if (!sortConfig.key || !sortConfig.direction) return 0;

                const key = sortConfig.key;
                const directionMultiplier = sortConfig.direction === SortType.ASC ? 1 : -1;

                if (a[key] < b[key]) return -1 * directionMultiplier;
                if (a[key] > b[key]) return 1 * directionMultiplier;
                return 0;
            }),
        [sortConfig, data],
    );

    const handleSortChange = useCallback((key: keyof (typeof data)[0]) => {
        setSortConfig((prevConfig) => {
            if (prevConfig.key === key) {
                const newDirection = prevConfig.direction === SortType.ASC ? SortType.DESC : prevConfig.direction === SortType.DESC ? SortType.NONE : SortType.ASC;
                return { key: newDirection ? key : null, direction: newDirection };
            }
            return { key, direction: SortType.ASC };
        });
    }, []);

    return { sortedData, handleSortChange, sortConfig, setSortConfig };
};
