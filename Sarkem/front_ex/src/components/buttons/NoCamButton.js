import React from 'react';
import styled from 'styled-components';
import camButtonImageSrc from '../../img/nocambutton.png';

const CamButtonImage = styled.img`
    width: 60px;
    height: 60px;   
    position: absolute;
    left: 30px;
    top: 150px;
    overflow: visible;
    z-index: 1;
`;

const NoCamButton = ({  }) => {

  return (
    <CamButtonImage src={camButtonImageSrc}/>
  );
};

export default NoCamButton;
