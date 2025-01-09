import React, { useMemo } from 'react';
import { Button } from '@/components/Button';
import { Flex, Text } from '@/styles/global';
import { ModalMigrateContent, ModalMigrateDefaultImages, ModalMigrateInfo } from '../styles';
import { ModalMigrateDefaultProps } from '../types';
import { useConfig } from '@/contexts/ConfigContext';
import Image from 'next/image';
import { Show } from '@/components/Show';
import { ImageWithFallback } from '@/components/Image';
import { Formatter } from '@/utils';

export const ModalMigrateDefault: React.FC<ModalMigrateDefaultProps> = ({ token, onCancel, onMigrate, onApprove }) => {
    const { theme } = useConfig();

    const allowance = useMemo(() => {
        return token?.migrationAllowance || 0n;
    }, [token]);

    return (
        <ModalMigrateContent>
            <Text fontSize="28px" textAlign="center" lineHeight="1">
                Migrate
            </Text>

            <ModalMigrateDefaultImages>
                <Image src="/img/memes/frog-09.svg" alt="" width={280} height={280} />
                <Image src="/img/memes/frog-hand-03.svg" alt="" width={100} height={150} />
                <Image src="/img/memes/frog-hand-04.svg" alt="" width={100} height={150} />
            </ModalMigrateDefaultImages>

            <Flex justifyContent="center">
                <ModalMigrateInfo>
                    <Flex alignItems="center">
                        <ImageWithFallback size={40} src={token?.imageUrl} radius="50%" />
                        <Text fontSize="38px" lineHeight="1">
                            {Formatter.formatNumber(token?.balance)}
                        </Text>
                    </Flex>
                </ModalMigrateInfo>
            </Flex>

            <Text color={theme.gray} textAlign="center" lineHeight="1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>

            {/* Actions */}
            <Flex justifyContent="space-between" paddingBottom="10px">
                <Button.Secondary width="120px" onClick={onCancel}>
                    Cancel
                </Button.Secondary>

                <Show.When isTrue={allowance === 0n}>
                    <Button.Primary width="120px" onClick={onApprove}>
                        Approve
                    </Button.Primary>
                </Show.When>

                <Show.When isTrue={allowance > 0n}>
                    <Button.Primary width="120px" onClick={onMigrate}>
                        Migrate
                    </Button.Primary>
                </Show.When>
            </Flex>
        </ModalMigrateContent>
    );
};
