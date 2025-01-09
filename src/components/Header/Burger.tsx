import React from 'react';
import { BurgerProps } from './types';
import { BurgerWrapper } from './styles';

export const Burger: React.FC<BurgerProps> = ({ isOpened, onClick }) => {
    return (
        <BurgerWrapper isOpened={isOpened} onClick={onClick}>
            <span></span>
            <span></span>
            <span></span>
        </BurgerWrapper>
    );
};
