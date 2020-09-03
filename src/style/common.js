import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export const DefaultColor = "#5cb85c";
export const DefaultRedColor = "#b21f00";
export const DefaultAlternateColor = "#137a8f";

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
export const HrPreview = styled.hr`
  border-top: 1px solid;
  margin-top: 0.25rem;
  color: #ebebeb;
  opacity: 90%;
`;

export const MutedH2 = styled.h2`
   color: #999 !important;
   margin: 0 0 8px !important;
   text-transform: uppercase;
   font-size: 14px;
`;
export const H1Preview = styled.h1`
   margin: 0 0 8px !important;
   text-transform: uppercase;
   font-size: 1rem;
   font-weight: 900;
`;
export const H1AssetPreview = styled.h1`
   margin: 0 0 8px !important;
   text-transform: uppercase;
   font-size: 1rem;
   font-weight: 900;
   color: ${DefaultColor}
`;
export const H1LiabilityPreview = styled.h1`
   margin: 0 0 8px !important;
   text-transform: uppercase;
   font-size: 1rem;
   font-weight: 900;
   color: ${DefaultRedColor}
`;

export const TransparentNavbar = styled(Navbar)`
  background: none;
  font-size: 12px;
`;


export const ErrorTextMuted = styled(Form.Text)`
  color: red !important;
  muted: true;
`;
export const TinyFormLabel = styled(Form.Label)`
 font-size: 12px;
 font-weight: 700;
`;
export const InlineFormLabel = styled(Form.Label)`
  top: 18px;
  left: 6px;
  position: relative;
  background-color: white;
  padding: 0px 5px 0px 5px;
  font-size: 0.9em;
  font-weight: 500;
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
    height: 1px;
    background: #000;
    transition: width .3s;
  };

  &:hover {
    text-decoration: none;
    color: inherit;
  }

  &:hover::after {
    width: 100%;
    transition: width .3s;
  }

  &:focus, &:visited, &:link, &:active {
    text-decoration: none;
  }

  &.outer {
    display: block;
  }
`;

export const HeaderLink = styled(Link)`
  font-family: titillium web,sans-serif;
  font-size: 1.5rem !important;
  padding-top: 0 !important;
  margin-right: 2rem !important;
  color: ${DefaultColor} !important;
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
  display: block;
  border: 1px solid #e8e8e8;
  border-radius: 6px !important;
  box-shadow: 0 8px 14px 0 rgba(0,0,0,.06);
  min-width: 264px;
  margin-bottom: 0.5rem;
`;
export const RoundGrayBorderBox = styled.div`
  background: #ebebeb;
  display: block;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  box-shadow: 0 8px 14px 0 rgba(0,0,0,.06);
  min-width: 264px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 0.5rem;
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

export const AiofBannerImage = styled.div`
  background-color: ${DefaultColor};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 128px;
  z-index: 1;
  text-align: left;
`;
export const AiofBanner = styled.div`
  background-color: ${DefaultColor};
  padding: 3rem;
  padding-top: 10rem;
  margin-bottom: 1rem;
  font-weight: 900;

  position: relative;
  top: 0;
  left: 0;
  transform: skewy(3deg);
  right: 0;
  height: 300px;
  z-index: 2;
`;