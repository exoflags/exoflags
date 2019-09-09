import React from 'react';
import styled from '@emotion/styled';

import aboutBackgroundImage from '../../../assets/ExoFlags_BG_Still.png';
import aboutBackgroundVideo from '../../../assets/ExoFlags_BG1.mp4';
import defaultBackgroundImage from '../../../assets/ExoFlags_BG1_Still.png';
import defaultBackgroundVideo from '../../../assets/ExoFlags_Space_BG.mp4';

const backgrounds = {
  about: {
    video: aboutBackgroundVideo,
    image: aboutBackgroundImage
  },
  default: {
    video: defaultBackgroundVideo,
    image: defaultBackgroundImage
  }
};

const PageView = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  color: ${props => props.theme.colors.white};
  background-color: #04040a;
  background-image: url(${defaultBackgroundImage});
  background-position: center center;
  background-size: cover;
`;

const Video = styled.video`
  position: absolute;
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

export const Page = props => {
  return (
    <PageView>
      <Video
        autoPlay
        muted
        loop
        src={
          props.video
            ? backgrounds[props.video].video
            : backgrounds.default.video
        }
        type="video/mp4"
        poster={defaultBackgroundImage}
      />

      <Children>{props.children}</Children>
    </PageView>
  );
};
