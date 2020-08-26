import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CustomHr = styled.hr`
  width: 90%;
`;

export const Hr50 = styled.hr`
  width: 50% !important;
  opacity: 0.5 !important;
  margin-left: 0px !important;
`;

export const MutedH2 = styled.h2`
   color: #999 !important;
   margin: 0 0 8px !important;
   text-transform: uppercase;
   font-size: 14px;
`;

export const ErrorTextMuted = styled(Form.Text)`
  color: red !important;
  muted: true;
`;

export const CoolLink = styled(Link)`
  margin-bottom: 10px;
  display: inline-block;
  color: #000;
  text-decoration: none;

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #000;
    transition: width .3s;
  };

  &:hover {
    text-decoration: none;
    color: inherit;
  }

  &:hover::after {
    width: 100%;
    //transition: width .3s;
  }

  &:focus, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;