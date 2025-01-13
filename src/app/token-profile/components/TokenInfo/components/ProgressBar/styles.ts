import styled from "styled-components";

export const Bar = styled.div<{ color: string; width: number }>`
  height: 100%;
  background-color: ${({ color }) => color};
  width: ${({ width }) => `${width}%`};
  transition: width 0.3s ease;
`;