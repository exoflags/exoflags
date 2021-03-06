import React, { useState } from 'react';
import Select from 'react-select';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from '@emotion/styled';

import { Page } from '../shared/Layout';

import CaltechLogo from '../Logos/CalTechLogo';
import NasaLogo from '../Logos/NasaLogo/';
import Flag from '../shared/Flag';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 5%;
  color: ${props => props.theme.colors.white};
  p {
    font-weight: 300px;
    letter-spacing: 0.09px;
  }
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: ${props => props.theme.colors.white};
  }
`;

const Header = styled.div`
  font-size: 3.75rem;
  font-weight: 800;
  color: white;
  margin-bottom: 2rem;
  @media only screen and (max-width: 900px) {
    font-size: 1.75rem;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: ${props => props.theme.colors.white};
    font-weight: 800;
    letter-spacing: 0.09px;
    margin: 0;
  }
`;

const Logos = styled.div``;

const SearchEl = styled.div`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 2rem;
`;

const Left = styled.div`
  width: 50%;
  @media only screen and (max-width: 900px) {
    width: 100%;
    padding: 5%;
  }
`;
const Right = styled.div`
  width: 50%;
  padding: 5%;
  @media only screen and (max-width: 900px) {
    width: 100%;
    padding: 5%;
  }
`;

const Stats = styled.div`
  margin-top: 2.4rem;
`;

const Ul = styled.ul`
  list-style-type: none;
  font-size: 1.25rem;
  font-weight: 800;
  margin-left: 0;
`;

export const Search = ({ data, extents }) => {
  const planetNames = data.map(planet => ({
    label: planet.pl_name,
    value: planet.pl_name
  }));
  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: 550
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: 32,
      border: '3px solid white',
      background: 'transparent',
      height: 64,
      width: 528,
      color: 'black'
    }),
    input: (provided, state) => ({
      ...provided,
      color: 'white'
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      padding: 8
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: 'white'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: 'white'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: 'white'
    })
  };

  const [selectedPlanet, setPlanet] = useState(null);

  const handleChange = planet => {
    setPlanet(planet);
  };

  const getProperties = () => {
    const obj = data.filter(obj => obj.pl_name === selectedPlanet);
    const planetData = {
      distance: obj[0].st_dist,
      stellarMass: obj[0].st_mass,
      stellarRadius: obj[0].st_rad,
      planetaryMass: obj[0].pl_bmassj,
      planetaryRadius: obj[0].pl_radj,
      planetaryNeighbours: obj[0].pl_pnum,
      constellation: obj[0].constellation
    };
    return planetData;
  };

  const displayProperties = property => {
    const data = getProperties();
    if (property === 'constellation' || property === 'planetaryNeighbours') {
      return data[property] ? data[property] : 'Currently unknown';
    } else {
      return data[property] ? data[property].toFixed(2) : 'Currently unknown';
    }
  };

  return (
    <Page video="search" fallbackImg="search">
      <Container>
        <Left>
          <Header>Search the API</Header>
          <p>
            You can browse the NASA / Caltech’s database for currently confirmed
            exoplanets by searching by the exoplanet name below.
          </p>

          <p>
            Searching will return a flag for the associated dataset which is
            drawn using the most current available data and therefore is subject
            to change.
          </p>
          <SearchEl>
            <Select
              placeholder="Type letter or number"
              options={planetNames}
              onChange={opt => handleChange(opt.value)}
              styles={customStyles}
            />
          </SearchEl>
          <p>
            The NASA Exoplanet Archive is an online astronomical exoplanet and
            stellar catalog and data service that collates and cross-correlates
            astronomical data and information on exoplanets and their host
            stars, and provides tools to work with these data. The archive is
            dedicated to collecting and serving important public data sets
            involved in the search for and characterization of extrasolar
            planets and their host stars. These data include stellar parameters
            (such as positions, magnitudes, and temperatures), exoplanet
            parameters (such as masses and orbital parameters) and
            discovery/characterization data (such as published radial velocity
            curves, photometric light curves, images, and spectra).
          </p>
          <p>
            You can find out more and view the dataset{' '}
            <a href="https://exoplanetarchive.ipac.caltech.edu/index.html">
              here
            </a>
            .
          </p>
          <Info>
            <p>Information provided by</p>
            <Logos>
              <NasaLogo />
              <CaltechLogo />
            </Logos>
          </Info>
        </Left>
        <Right>
          {selectedPlanet && (
            <>
              <Header>{selectedPlanet}</Header>
              <AutoSizer disableHeight>
                {({ width }) => (
                  <Flag
                    width={width}
                    extents={extents}
                    flagProperties={getProperties()}
                    basicFlag
                  />
                )}
              </AutoSizer>
              <Stats>
                <Ul>
                  <li>Distance: {displayProperties('distance')} </li>
                  <li>Host star mass: {displayProperties('stellarMass')} </li>
                  <li>
                    Host star radius: {displayProperties('stellarRadius')}
                  </li>
                  <li>Planetary mass: {displayProperties('planetaryMass')} </li>
                  <li>
                    Planetary radius: {displayProperties('planetaryRadius')}{' '}
                  </li>
                  <li>
                    Planets in system:{' '}
                    {displayProperties('planetaryNeighbours')}{' '}
                  </li>
                  <li>Constellation: {displayProperties('constellation')} </li>
                </Ul>
              </Stats>
            </>
          )}
        </Right>
      </Container>
    </Page>
  );
};
