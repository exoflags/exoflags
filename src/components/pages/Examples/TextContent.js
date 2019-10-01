import React from 'react';
import styled from '@emotion/styled';

const Heading = styled.h1`
  font-size: 3.75rem;
  @media only screen and (max-width: 900px) {
    font-size: 1.75rem;
  }
`;

const Text = styled.div`
  span {
    font-weight: 800;
  }
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: ${props => props.theme.colors.white};
  }
`;

const Content = ({ stepId }) => (
  <>
    {stepId === 0 ? (
      <Text>
        <Heading>Objects of interest</Heading>
        <p>
          Click a planet above to discover a selection of notable confirmed
          exoplanets and their associated flag visualisations.
        </p>
      </Text>
    ) : stepId === 1 ? (
      <Text>
        <Heading>Most Recently Confirmed</Heading>
        <p>
          <span>Beta Pictoris-C</span> was discovered on August 28th 2019 by
          Lagrange et al. It can be found 19.3 Parsecs away from Earth in the
          consteallation Pictor. It is 2860 times more massive than the Earth.
          Its host star has a mass of 1.76 solar masses.
        </p>
        <p>
          As new planets get discovered, this page and our Instagram feed
          automatically posts the most up-to-date flag visualisation, follow
          <a href="https://www.instagram.com/exoflags/"> @Exoflags </a>on
          Instagram to stay up to date.
        </p>
      </Text>
    ) : stepId === 2 ? (
      <Text>
        <Heading>Closest Confirmed</Heading>
        <p>
          The closest confirmed exoplanet is <span>Proxima Centauri b</span>,
          which was confirmed in 2016 to orbit Proxima Centauri, the closest
          star to our Solar System, 1.3 parsecs (4.25 light years) away in the
          constellation Centaurus.
        </p>
        <p>
          At the current progress of human space travel technology, it would
          take over 81,000 years to reach it.
        </p>
      </Text>
    ) : stepId === 3 ? (
      <Text>
        <Heading>Largest Confirmed</Heading>
        <p>
          The largest planet discovered to date is also one of the strangest and
          theoretically should not even exist, scientists say. Dubbed{' '}
          <span>TrES-4</span>, the planet is about 1.7 times the size of Jupiter
          and belongs to a small subclass of "puffy" planets that have extremely
          low densities.
        </p>
      </Text>
    ) : (
      stepId === 4 && (
        <Text>
          <Heading>Best candidate for supporting life</Heading>
          <p>
            A 2015 review concluded that the exoplanet <span>Kepler-186f </span>
            was likely the best candidates for being potentially habitable. It
            is located at a distance of 490 light-years away.
          </p>
          <p>
            Kepler-186f is similar in size to Earth with a 1.2-Earth-radius size
            and it is located towards the outer edge of the habitable zone
            around its red dwarf host star in the constellation Cygnus.
          </p>
        </Text>
      )
    )}
  </>
);

export default Content;
