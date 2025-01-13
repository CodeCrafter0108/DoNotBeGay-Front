import { Box } from '@/components/Box';
import { Flex, Text } from '@/styles/global';
import { Wrapper, Badge, DonationImage, FrogImage, MouseImage, StyledLink, LinkWrapper, PlanetIcon, Description, TitleWrapper, TitleContent } from './styles';
import { Icon } from '@/components/Icon';
import { PairState } from '@/types';
import { externalLinks } from './constants';

export const TournamentCard: React.FC = () => {
    return (
        <Wrapper>
            <Box padding="0" height='100%'>
                <Flex flexDirection={'column'}>
                    <TitleWrapper>
                        <Badge>Tournament #21</Badge>
                        {/* <Flex gap={8} alignItems={'center'}> */}
                        <TitleContent>
                            <Icon.Token.Primary state={PairState.WIN} path={''} sizeWrapperIcon={35} size={23} />
                            <Text fontSize="28px" lineHeight="normal">
                                Mandalorians
                            </Text>
                        </TitleContent>
                        <MouseImage src="/img/tokenProfile/mouse.png" width={57} height={25} alt="mouse" priority />
                        <Badge isRotate>Tournament #21</Badge>
                    </TitleWrapper>
                    <Flex alignItems={'center'} justifyContent={'center'}>
                        <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Description>
                    </Flex>
                    <Flex alignItems={'flex-end'} justifyContent={'center'} height={'100px'}>
                        <FrogImage src="/img/tokenProfile/frog.png" width={77} height={71} alt="frog" priority />
                        <LinkWrapper>
                            {externalLinks.map((item, index) => (
                                <StyledLink href={item.href} key={index}>
                                    <PlanetIcon />
                                    <Text>figma.com/design</Text>
                                </StyledLink>
                            ))}
                        </LinkWrapper>
                        <DonationImage src="/img/tokenProfile/donation.png" width={64} height={63} alt="donation image" priority />
                    </Flex>
                </Flex>
            </Box>
        </Wrapper>
    );
};
