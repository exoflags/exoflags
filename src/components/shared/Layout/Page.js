import React from 'react';
import styled from '@emotion/styled';

import backgroundVideo from '../../../assets/ExoFlags_Space_BG.mp4';
import backgroundImage from '../../../assets/ExoFlags_BG_Still.png';

const Video = styled.video`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const PageView = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  color: ${props => props.theme.colors.white};
  background-color: #04040a;
  background-image: url(${backgroundImage});
  background-position: center center;
  background-size: cover;
`;

export const Page = props => {
  return (
    <PageView>
      <Video
        autoPlay
        muted
        loop
        src={backgroundVideo}
        type="video/mp4"
        poster={backgroundImage}
      />
      {props.children}
    </PageView>
  );
};
