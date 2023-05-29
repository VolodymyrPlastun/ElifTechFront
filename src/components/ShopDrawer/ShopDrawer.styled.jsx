import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const PageLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.25rem;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: inherit;
  font-family: monospace;
  font-weight: 700;

  &.${props => props.activeclassname} {
    color: darkblue;
    text-decoration: underline;
  }
`;

export const ChooseBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
`;