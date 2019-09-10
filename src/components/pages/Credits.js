import React from 'react';
import styled from '@emotion/styled';

import theme from '../../theme';
import { Page } from '../shared/Layout';
import ExoFlagsLogo from '../Logos/ExoFlagsLogo';

const ImgContainer = styled.div`
  padding: 8rem 0 0 0;
`;

const ContentContainer = styled.div`
  padding: 2rem 8rem;
  height: auto;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;
const TextContainer = styled.div`
  color: ${props => props.theme.colors.white};
  font-size: 1.25rem;
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
`;

const Flexbox = styled.div`
  display: flex;
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
  width: 675px;
`;

export const Credits = () => (
  <Page video="credits">
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
              Further information and data was obtained from
              <a href="https://www.exoplanetkyoto.org">
                {' '}
                www.exoplanetkyoto.org{' '}
              </a>
              resource
            </P>
          </div>
        </Flexbox>
      </TextContainer>
    </ContentContainer>
  </Page>
);
