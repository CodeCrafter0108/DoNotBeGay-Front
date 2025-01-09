import { InputVariant } from '@/components/Input/types';

export const formatByVariant = (variant: InputVariant, value: string) => {
    switch (variant) {
        case 'text':
        case 'search':
            // Allow spaces (add a space to the allowed characters in the regex)
            return value.replace(/[^a-zA-Z0-9 ]/g, '');
        case 'link':
            // Allow :// by adding it explicitly in the regex
            return value.replace(/[^a-zA-Z0-9-._:/?&=]/g, '').replace(/(?<!:)\/{3,}/g, ''); // Prevent more than two slashes unless after a colon
        case 'number':
        case 'currency': {
            let _value = value.replace(/[^0-9.]/g, '');
            const parts = _value.split('.');

            // If there are more than one decimal point, join all parts after the first one
            if (parts.length > 2) {
                _value = parts[0] + '.' + parts.slice(1).join('');
            }

            // Prevent input from being just a decimal point
            if (_value === '.') {
                _value = '';
            }

            // Prevent multiple leading zeros before the decimal point
            if (_value.startsWith('0') && !_value.startsWith('0.') && _value.length > 1) {
                _value = '0';
            }

            return _value;
        }
        default:
            return value;
    }
};
