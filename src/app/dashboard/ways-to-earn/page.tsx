'use client';

import { Container, PageContainer } from '@/styles/global';
import { Card } from './components/Card/Card';
import { springToBottom } from '@/common/animations';
import { motion } from 'framer-motion';
import { CardsWrapper } from './styles';

export default function WaysToEarn() {
    return (
        <Container paddingMobile="10px">
            <motion.div {...springToBottom}>
                <PageContainer>
                    <CardsWrapper>
                        <Card />
                        <Card />
                        <Card />
                    </CardsWrapper>
                </PageContainer>
            </motion.div>
        </Container>
    );
}
