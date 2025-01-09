import React from 'react';
import { CircleWrapper, CircleWrapperLines } from './styles';

export const Circle: React.FC = () => {
    return (
        <CircleWrapper>
            <CircleWrapperLines>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </CircleWrapperLines>
        </CircleWrapper>
    );
};
