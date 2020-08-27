import styled from 'styled-components';
import { Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ContainerAiof = styled(Container)`
  padding: 2rem;
`;

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

export const HeaderLink = styled(Link)`
  font-family: titillium web,sans-serif;
  font-size: 1.5rem !important;
  padding-top: 0 !important;
  margin-right: 2rem !important;
  color: #5cb85c !important;
  padding-bottom: 0rem;
  line-height: inherit;
  white-space: nowrap;
  float: left;

  &:hover {
    text-decoration: none;
    color: inherit;
  }

  &:focus, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

export const RoundBorderBox = styled.div`
  background: #fff;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 8px 14px 0 rgba(0,0,0,.06);
  min-width: 264px;
`;
export const RoundBorderBoxText = styled.div`
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const TinyPadding = styled.div`
  padding: 0.25rem;
`;