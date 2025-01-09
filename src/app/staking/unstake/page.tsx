'use client';

import { CardAction } from '../components/CardAction';
import { CardInfo } from '../components/CardInfo';
import { CardsWrapper } from '../styles';

export default function Unstake() {
    const handleUnstake = () => {
        console.log('Unstake');
    };

    const handleClaim = () => {
        console.log('Claim');
    };

    return (
        <CardsWrapper>
            <CardAction title="Unstake" actionText="Unstake" onAction={handleUnstake} />
            <CardInfo title="Lost Rewards" tokenName="{tokenname}" rewards="15,254,000" onAction={handleClaim} />
        </CardsWrapper>
    );
}
