import { Card, CardMedia } from '@mui/material';
import styled from 'styled-components';

export const Img = styled(CardMedia)`
  transition: transform 0.2s ease-out;
`;

export const PizzaCard = styled(Card)`
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  &:hover Img {
    transform: scale(1.05);
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow: hidden;
`;

export const BtnBox = styled.div`
  display: flex;
  align-items: center;
`;

export const Amount = styled.p`
  color: blue;
  font-size: 1.5rem;
  margin: 0;
`;
