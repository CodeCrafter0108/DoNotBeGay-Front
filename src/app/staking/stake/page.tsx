'use client';

import { CardAction } from '../components/CardAction';
import { CardInfo } from '../components/CardInfo';
import { CardsWrapper } from '../styles';

export default function Stake() {
    const handleStake = () => {
        console.log('Stake');
    };

    const handleClaim = () => {
        console.log('Claim');
    };

    return (
        <CardsWrapper>
            <CardAction title="Stake" actionText="Stake" onAction={handleStake} />
            <CardInfo title="Pending Rewards" tokenName="{tokenname}" rewards="15,254,000" onAction={handleClaim} />
        </CardsWrapper>
    );
}
