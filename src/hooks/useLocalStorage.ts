import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, initialValue?: any) => {
    const [state, setState] = useState(initialValue);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            try {
                const value = window.localStorage.getItem(key);
                setState(value ? JSON.parse(value) : initialValue);
            } catch (error) {
                console.log(error);
            }
        }
    }, [isClient, key, initialValue]);

    const setValue = (value: any) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;
            setState(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));

            const event = new StorageEvent('storage', {
                key,
                oldValue: state as any,
                newValue: JSON.stringify(valueToStore),
            });

            window.dispatchEvent(event);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key) {
                try {
                    const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
                    setState(newValue);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, initialValue]);

    return [state, setValue];
};
