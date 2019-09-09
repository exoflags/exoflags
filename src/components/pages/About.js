import React from 'react';
import styled from '@emotion/styled';

import theme from '../../theme';
import { Page } from '../shared/Layout';
import ExoFlagsLogo from '../Logos/ExoFlagsLogo';

const ImgContainer = styled.div`
  padding: 2rem 0 0 8rem;
`;
const Container = styled.div`
  color: ${props => props.theme.colors.white};
  font-size: 1.25rem;
  padding: 0 8rem;
  column-gap: 5rem;
  columns: 2;
  span {
    font-weight: 800;
  }
`;

const SubHeading = styled.h2`
  font-size: 3.75rem;
`;

export const About = () => (
  <Page>
    {/* <> */}
    <ImgContainer>
      <ExoFlagsLogo />
    </ImgContainer>
    <Container>
      <SubHeading>
        Exoflags is a system that generates flags for newly discovered planets
        by using data collected about them
      </SubHeading>
      <p>
        Radio astronomers Aleksander Wolszczan and Dale Frail announced the
        discovery of two planets beyond our solar system in 1992. Since then,
        countless studies around the world have given new insight on the
        discovery of new worlds outside our solar system ncluding notably,
        NASA’s 2009 Kepler Space Telescope mission which discovered an
        unprecedented 2,662 confirmed planets.
      </p>
      <p>
        <span>To date, 4,044 exoplanets have been confirmed</span>
      </p>
      <p>
        …and scientists believe that there could be as many as 40 billion rocky
        Earth-size exoplanets orbiting in the habitable zones of Sun-like stars
        and red dwarfs within the Milky Way.
      </p>
      <p>
        This new age of discovery and rapidly advancing technology is fuelling
        advancement in the discovery of new worlds, but often, our growing rate
        of discovery coupled with a disparate and contradictory scientific
        naming methods rarely give outsiders an inherent sense of identity or
        wonder to each newfound world.
      </p>
      <p>
        <span>
          As we continue to gaze further into space and discover exponentially
          more new planets, the wonder of discovery to the layman is at risk of
          being lost in the data.
        </span>
      </p>
      <p>
        Exoflags seeks to inspire wonder and insight to each new discovery by
        giving a little piece of identity, rooted in the planet’s data, to
        encourage a wider audience to learn more about the exciting new
        discoveries at the frontier of planetary discovery.{' '}
      </p>
      <p>
        Exoflags is a dynamic data visualisation tool where information can be
        updated continuously. New flags and data metrics on the site get
        populated as soon as new data arrives, making each discovery come to
        life instantly.
      </p>
      <p>
        <span>
          From a spreadsheet of data to a visual momento of our discovery of our
          place in the wider universe.
        </span>
      </p>
    </Container>
  </Page>
  //   </>
);
