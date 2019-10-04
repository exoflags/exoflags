import React from 'react';
import styled from '@emotion/styled';

import spaceBackgroundImage from '../../../assets/FN_ExoFlags_Space_Still.png';
import earthBackgroundVideo from '../../../assets/ExoFlags_BG1.mp4';
import earthBackgroundImage from '../../../assets/ExoFlags_BG1_Still.png';
import spaceBackgroundVideo from '../../../assets/NF_ExoFlags_Space.mp4';
import exploreBackgroundVideo from '../../../assets/FN_ExoFlags_Explore.mp4';

const backgrounds = {
  about: {
    video: earthBackgroundVideo,
    image: earthBackgroundImage
  },
  explore: {
    video: exploreBackgroundVideo,
    image: ''
  },
  credits: {
    video: exploreBackgroundVideo,
    image: spaceBackgroundImage
  },
  default: {
    video: spaceBackgroundVideo,
    image: spaceBackgroundImage
  },
  search: {
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
  margrin-top: ${props => props.theme.headerHeight};
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
