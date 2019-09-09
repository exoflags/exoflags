import React from 'react';
import styled from '@emotion/styled';

import backgroundVideo from '../../../assets/ExoFlags_Space_BG.mp4';
import backgroundImage from '../../../assets/ExoFlags_BG_Still.png';

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

export const Page = ({
  video = backgroundVideo,
  fallbackImg = backgroundImage,
  children
}) => {
  return (
    <PageView>
      <Video
        autoPlay
        muted
        loop
        src={video}
        type="video/mp4"
        poster={fallbackImg}
      />

      <Children>{children}</Children>
    </PageView>
  );
};
