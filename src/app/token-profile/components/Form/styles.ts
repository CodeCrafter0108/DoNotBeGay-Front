import { Breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const Wrapper = styled.div`
    @media screen and (min-width: ${Breakpoints.lg}) {
        width: 100%;
        max-width: 530px;
        height: 100%;
    }
`;