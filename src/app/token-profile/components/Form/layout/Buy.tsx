import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Flex, Text } from '@/styles/global';

export const Buy = () => {
    return (
        <Flex flexDirection="column" gap={24}>
            <Input.Currency
                fontSize="24px"
                height="70px"
                token={undefined}
                value={0}
                valueUsd={'0'}
                balance={'0'}
                selectable={false}
                onChange={() => console.log('change')}
                onMax={() => console.log('max')}
            />

            <Button.Primary width="100%" onClick={() => console.log('action')}>
                {'Buy'}
            </Button.Primary>
        </Flex>
    );
};
