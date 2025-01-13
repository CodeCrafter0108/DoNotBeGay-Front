'use client';
import { motion } from 'framer-motion';
// import { Container } from './styles';
import { springToBottom, springZoomIn } from '@/common/animations';

import { PageContainer, Container } from '@/styles/global';
import { TournamentCard } from './components/TournamentCard';
import { TokenInfo } from './components/TokenInfo';
import { HolderDistribution } from './components/HolderDistribution';
import { TransactionTable } from './components/TransactionTable';
import { Form } from './components/Form';
import { Chart } from './components/Chart';
import {PageHeader, PageContent } from './styles';

export default function Tournament() {
    return (
        <Container>
            <motion.div {...springToBottom}>
                <PageContainer style={{gap: '16px'}}>
                    <PageHeader>
                        <TournamentCard />
                        <Form />
                    </PageHeader>
                    <PageContent>
                        <Chart />
                        <TokenInfo />
                        <HolderDistribution />
                        <TransactionTable />
                    </PageContent>
                </PageContainer>
            </motion.div>
        </Container>
    );
}
