'use client';

import { Container, Flex, PageContainer } from '@/styles/global';

import { motion } from 'framer-motion';
import { springToBottom } from '@/common/animations';

export default function Home() {
    return (
        <Container>
            <motion.div {...springToBottom}>
                <PageContainer>
                    <Flex justifyContent="center">Welcome</Flex>
                </PageContainer>
            </motion.div>
        </Container>
    );
}
