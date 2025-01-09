'use client';

import { Container, Flex, Text, PageContainer } from '@/styles/global';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Container>
            <PageContainer>
                <Flex flexDirection="column" gap={10} alignItems="center">
                    <Text fontSize="30px">Not Found</Text>
                    <Text fontSize="18px">Could not find requested resource</Text>
                    <Flex>
                        <Link href="/">
                            <Button.Secondary>Go to Home</Button.Secondary>
                        </Link>
                    </Flex>
                </Flex>
            </PageContainer>
        </Container>
    );
}
