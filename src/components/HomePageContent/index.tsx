import { MainBadge, Icon, CardsWrapper } from './styles';
import Image from 'next/image';
import Link from 'next/link';
import { cardsData, socialHomePage } from './constants';
import { Flex } from '@/styles/global';
import { Card } from './components/Card';
import { Show } from '../Show';
import { Breakpoints } from '@/styles/breakpoints';

export const HomePageContent = () => {
    return (
        <>
            <Flex justifyContent={'space-between'}>
                <MainBadge>
                    <Flex gap={12} alignItems={'center'}>
                        <Image src="/img/icons/sidebar-logo.svg" alt="Logo" width={49} height={48} />
                        <Image src="/img/icons/dnbg.svg" alt="Title" width={49} height={16} />
                    </Flex>

                    <Show.Toggle showBelow={Breakpoints.md}>
                        {socialHomePage.map((item, index) => (
                            <Link key={index} href={item.link} target={'_blank'} rel={'noreferrer'}>
                                <Icon src={item.icon} alt="Social network" width={24} height={24} />
                            </Link>
                        ))}
                    </Show.Toggle>
                </MainBadge>
                <Show.Toggle showAbove={Breakpoints.md}>
                    <MainBadge isRotate>
                        {socialHomePage.map((item, index) => (
                            <Link key={index} href={item.link} target={'_blank'} rel={'noreferrer'}>
                                <Icon src={item.icon} alt="Social network" width={24} height={24} />
                            </Link>
                        ))}
                    </MainBadge>
                </Show.Toggle>
            </Flex>
            <CardsWrapper>
                {cardsData.map((item, index) => (
                    <Card key={index} {...item} />
                ))}
            </CardsWrapper>
        </>
    );
};
