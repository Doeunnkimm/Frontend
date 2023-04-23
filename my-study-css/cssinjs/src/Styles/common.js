import { css } from 'styled-components';

export const FlexAlignCenterCSS = css`
  display: flex;
  align-items: center;
`;

export const GridCenterCSS = css`
  display: grid;
  justify-content: center;
`;

export const GridColumn4CSS = css`
  ${GridCenterCSS};
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1.5rem;
`;

export const GridColumn12CSS = css`
  ${GridCenterCSS};
  grid-template-columns: repeat(12, 1fr);
  column-gap: 1.5rem;
`;
