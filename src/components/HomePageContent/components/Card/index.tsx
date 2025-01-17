import { Wrapper, StyledLink, Content, Title } from './styles';
import { CardData } from '../../types';

export const Card = ({ title, link, linkType, bgImageMob, bgImageDesk }: CardData) => {
    return (
        <Wrapper bgImageDesk={bgImageDesk} bgImageMob={bgImageMob}>
            <Content>
                <Title>{title}</Title>
                <StyledLink href={link} linkType={linkType}>
                    Open App
                </StyledLink>
            </Content>
        </Wrapper>
    );
};
