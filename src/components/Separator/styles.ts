import styled from 'styled-components';
import { SeparatorWrapperProps } from '@/components/Separator/types';

export const Wrapper = styled.div<SeparatorWrapperProps>`
    background: ${({ color }) => color || 'rgba(255, 255, 255, 1)'};
    opacity: ${({ opacity }) => opacity || 1};
    ${({ vertical }) => (vertical ? 'width: 1px; height: 100%;' : 'height: 1px; width: 100%;')}
`;
