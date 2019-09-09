import React from 'react';
import styled from '@emotion/styled';

import theme from '../../theme';
import { Page } from '../shared/Layout';
import ExoFlagsLogo from '../Logos/ExoFlagsLogo';

const ImgContainer = styled.div`
  padding: 2rem 0 0 8rem;
`;

const ContentContainer = styled.div`
  padding: 2rem 4rem;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;
const TextContainer = styled.div`
  color: ${props => props.theme.colors.white};
  font-size: 1.25rem;
  //   column-gap: 5rem;
  //   columns: 2;
  //   span {
  //     font-weight: 800;
  //   }
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
              <span>Aifric Delahunty</span> - Database & Calculations
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
          <P>
            Original Constellation Icon set by Denis Moskowitz used under
            creative commons licence, available from the noun project here
            <span>Data obtained from the NASA / Caltech exoplanet archive</span>
            Further information and data was obtained from
            www.exoplanetkyoto.org resource
          </P>
        </Flexbox>
      </TextContainer>
    </ContentContainer>
  </Page>
);
