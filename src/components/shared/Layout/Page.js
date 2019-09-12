import React from 'react';
import styled from '@emotion/styled';

import spaceBackgroundImage from '../../../assets/ExoFlags_BG_Still.png';
import earthBackgroundVideo from '../../../assets/ExoFlags_BG1.mp4';
import earthBackgroundImage from '../../../assets/ExoFlags_BG1_Still.png';
import spaceBackgroundVideo from '../../../assets/ExoFlags_Space_BG.mp4';
import exploreBackgroundVideo from '../../../assets/Exoflags_Temp_BG2a.mp4';

const backgrounds = {
  earth: {
    video: earthBackgroundVideo,
    image: earthBackgroundImage
  },
  flags: {
    video: exploreBackgroundVideo,
    image: spaceBackgroundImage
  },
  default: {
    video: spaceBackgroundVideo,
    image: spaceBackgroundImage
  }
};

const PageView = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  color: ${props => props.theme.colors.white};
  background-color: #04040a;
  background-image: url(${earthBackgroundImage});
  background-position: center center;
  background-size: cover;
`;

const Video = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 1;
`;

const Children = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  width: 100%;
`;

export const Page = ({
  video = 'default',
  fallbackImg = 'default',
  children
}) => {
  return (
    <PageView>
      <Video
        autoPlay
        muted
        loop
        src={backgrounds[video].video}
        type="video/mp4"
        poster={backgrounds[fallbackImg].image}
      />

      <Children>{children}</Children>
    </PageView>
  );
};
