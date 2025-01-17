'use client';

import { Container, PageContainer } from '@/styles/global';
import { motion } from 'framer-motion';
import { springToBottom } from '@/common/animations';
import { HomePageContent } from '@/components/HomePageContent';

export default function Home() {
    return (
        <Container paddingMobile='0px'>
            <motion.div {...springToBottom}>
                <PageContainer style={{ padding: '20px 0 0 0', gap: '0px' }}>
                    <HomePageContent />
                </PageContainer>
            </motion.div>
        </Container>
    );
}
