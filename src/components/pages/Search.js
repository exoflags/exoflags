import React, { useState } from 'react';
import Select from 'react-select';
import styled from '@emotion/styled';

import { Page } from '../shared/Layout';

import CaltechLogo from '../Logos/CalTechLogo';
import NasaLogo from '../Logos/NasaLogo/';
import Flag from '../shared/Flag';

const Container = styled.div`
  display: flex;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  p {
    font-weight: 300px;
    letter-spacing: 0.09px;
    font-size: 1.25rem;
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
  font-size: 4rem;
  font-weight: 800;
  color: white;
  margin-bottom: 2rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;

  p {
    color: ${props => props.theme.colors.white};
    font-weight: 800;
    letter-spacing: 0.09px;
    font-size: 1.25rem;
    margin: 0;
  }
`;

const Logos = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: flex-start;
`;

const SearchEl = styled.div`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 2rem;
`;

const Left = styled.div`
  width: 50%;
  padding: 5%;
`;
const Right = styled.div`
  width: 50%;
  padding: 5%;
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
      color: 'white'
    }),
    option: (provided, state) => ({
      color: 'black',
      padding: 8
    }),
    placeholder: (provided, state) => ({
      color: 'white'
    }),
    dropdownIndicator: (provided, state) => ({
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
      return data[property] ? data[property] : 'n/a';
    } else {
      return data[property] ? data[property].toFixed(2) : 'n/a';
    }
  };

  return (
    <Page>
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
            You can find out more and view the dataset here:
            <a href="https://exoplanetarchive.ipac.caltech.edu/index.html">
              https://exoplanetarchive.ipac.caltech.edu/index.html
            </a>
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
              <Flag
                width={600}
                extents={extents}
                flagProperties={getProperties()}
                basicFlag
              />
              <Stats>
                <Ul>
                  <li>Distance: {displayProperties('distance')} </li>
                  <li>Host star mass 2:{displayProperties('stellarMass')} </li>
                  <li>
                    Host star radius: {displayProperties('stellarRadius')}
                  </li>
                  <li>Planetary Mass: {displayProperties('planetaryMass')} </li>
                  <li>
                    Planetary Radius: {displayProperties('planetaryRadius')}{' '}
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
