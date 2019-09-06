import React, { useState } from 'react';
import Select from 'react-select';
import styled from '@emotion/styled';

import theme from '../../theme';

import CaltechLogo from '../Logos/CalTechLogo';
import NasaLogo from '../Logos/NasaLogo/';
import Flag from '../Flag';

export const Search = data => {
  const planetNames = data.data.map(planet => ({
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
      width: 528
      // color: 'white'
    })
  };

  const [selectedPlanet, setPlanet] = useState(null);

  const Container = styled.div`
    display: flex;
    justify-content: center;
    // color: ${props => props.theme.colors.white};    
    p {
      font-weight: 300px;
      letter-spacing: 0.09px;
      font-size: 1.25rem;
    }
  `;

  const Header = styled.div`
    font-size: 4rem;
    font-weight: 800;
    color: white;
  `;

  const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      color: ${props => props.theme.colors.white};

      font-weight: 800;
      letter-spacing: 0.09px;
      font-size: 1.25rem;
      margin: 0;
    }
  `;

  const Logos = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `;

  const Search = styled.div`
    display: flex;
  `;

  const SearchButton = styled.button`
    background: transparent;
    border-radius: 32px;
    border: 3px solid ${props => props.theme.colors.white};
    font-size: 1.25rem;
    width: 136px;
    color: ${props => props.theme.colors.white};
    font-weight: 800;
  `;

  const Left = styled.div`
    width: 50%;
    padding: 5%;
  `;
  const Right = styled.div`
    width: 50%;
    padding: 5%;
  `;

  const handleChange = planet => {
    setPlanet(planet);
  };
  return (
    <div>
      <Container>
        <Left>
          <Header>Search the API</Header>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit concept of the number one a still more glorious dawn awaits
            shores of the cosmic ocean two ghostly white figures in coveralls
            and helmets are soflty dancing totam rem aperiam, eaque ipsa quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo and billions upon billions upon billions upon billions
            upon billions upon billions upon billions.
          </p>
          <Search>
            <Select
              placeholder="Type letter or number"
              options={planetNames}
              onChange={opt => handleChange(opt.value)}
              styles={customStyles}
            />
            <SearchButton>SEARCH</SearchButton>
          </Search>
          <Info>
            <p>Information provided by</p>
            <Logos>
              <NasaLogo />
              <CaltechLogo />
            </Logos>
          </Info>
        </Left>
        <Right>
          <Header>Planet Name</Header>
          <Flag
          // redshift = {}
          // planetaryMass = {useState(planet.)}
          // planetaryRadius = {}
          // stellarMass = {}
          // stellarRadius = {}
          />
        </Right>
      </Container>
    </div>
  );
};
