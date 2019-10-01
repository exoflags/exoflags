import React from 'react';
import styled from '@emotion/styled';

import theme from '../../theme';
import { Page } from '../shared/Layout';
import ExoFlagsLogo from '../Logos/ExoFlagsLogo';

const ImgContainer = styled.div`
  padding: 0;
`;

const ContentContainer = styled.div`
  padding: 5%;
  height: auto;
  width: 100%;
`;
const TextContainer = styled.div`
  color: ${props => props.theme.colors.white};

  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: ${props => props.theme.colors.white};
  }
`;

const Hr = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${props => props.theme.colors.grey.warm};
  margin: 1rem 0 2rem 0;
`;
const SubHeading = styled.h2`
  font-size: 3.75rem;
  @media only screen and (max-width: 900px) {
    font-size: 1.75rem;
  }
`;

const Flexbox = styled.div`
  display: flex;
  @media only screen and (max-width: 1200px) {
    flex-wrap: wrap;
  }
`;

const Ul = styled.ul`
  list-style-type: none;
  span {
    font-weight: 800;
  }
  margin-left: 0;
  width: 50%;
`;

const P = styled.p`
  max-width: 675px;
`;

export const Credits = () => (
  <Page video="credits" fallbackImg="credits">
    <ContentContainer>
      <ImgContainer>
        <ExoFlagsLogo />
      </ImgContainer>
      <Hr />
      <TextContainer>
        <SubHeading>Credits</SubHeading>
        <Flexbox>
          <Ul>
            <li>
              <span>Daragh Anderson</span> - Design / Art Direction
            </li>
            <li>
              <span>Simona Ciocoiu</span> - Research
            </li>
            <li>
              <span>Aifric Delahunty</span> - Database &amp; Calculations
            </li>
            <li>
              <span>Katie Dobberstein</span> - Research
            </li>
            <li>
              <span>Arina Fjodorova</span> - UI/UX Design
            </li>
            <li>
              <span>Sam Riches</span> - Copy Editor
            </li>
            <li>
              <span>Rory Sedgwick</span> - Front End Development
            </li>
            <li>
              <span>Tom Valorsa</span> - Front End Development
            </li>
            <li>
              <span>Alexis Wilkinson-Defoe</span> - Front End Development
            </li>
          </Ul>
          <div>
            <P>
              Original Constellation Icon set by Denis Moskowitz used under
              creative commons licence, available from the noun project
              <a href="https://thenounproject.com/denismm/collection/constellation-symbols-fixed-width/">
                {' '}
                here{' '}
              </a>
            </P>
            <P>Data obtained from the NASA / Caltech exoplanet archive</P>
            <P>
              Further information and data was obtained from the
              <a href="https://www.exoplanetkyoto.org"> ExoKyoto </a>
              resource.
            </P>
          </div>
        </Flexbox>
      </TextContainer>
    </ContentContainer>
  </Page>
);
