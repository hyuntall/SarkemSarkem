
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import logoImage from '../img/logo.png';
import camcatImage from '../img/camcat.png';
import boxImage from '../img/box.png';
import Background from '../components/backgrounds/BackgroundSunset';
import usernicknameImage from '../img/usernickname.png';
import usernicknameinputImage from '../img/usernicknameinput.png';
import offImage from '../img/off.png';
import onImage from '../img/on.png'
import micImage from '../img/mic.png';
import camImage from '../img/cam.png';
import MakeroomButton from '../components/buttons/makeroomButton';
import GoroomButton from '../components/buttons/goroomButton';
import { useNavigate, useLocation } from 'react-router-dom';
import CamCat from '../components/camera/camcat';


const StyledStartPage = styled.div`
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh; /* 화면 높이의 15%로 설정 */
  width: 100%;
  background-color: rgba(196, 196, 196, 0.3);
`;

const StyledContent = styled.div`
  display: flex;
  height: 85vh; /* 화면 높이의 85%로 설정 */
  width: 100%;
`;

const LeftSection = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;
`;

const RightSection = styled.div`
  /* 오른쪽 섹션 스타일 작성 */
  flex: 6; /* 60% of the available width */
  background-image: url(${boxImage});
  background-size: 90% 85%;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 30px; /* 원하는 크기로 설정 */
`;

const DivWrapper = styled.div`
  /* Wrapper for each RightDiv to split into two parts, except for Div 4 */
  display: flex;
  width : 100%;
  height : 100%;
  justify-content: center;
`;

const LeftPart = styled.div`
  /* Left part of each RightDiv */
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 15vw;
  background-position: center center;
  padding : 50px 0px 0px 150px ;
  background-repeat: no-repeat;
`;

const RightPart = styled.div`
  /* Right part of each RightDiv */
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 15vw;
  background-position: center center;
  background-repeat: no-repeat;
  padding: 50px 0px 50px 150px;

  /* Input styling */
  input {
    width: 100%;
    padding: 5px;
    font-size: 28px;
    border: none;
    background-color: transparent;
    outline: none;
  }
`;

const Logo = styled.img`
  /* 로고 이미지 스타일 작성 */
  max-width: 60vw; /* 가로 크기 60% */
  height: auto; /* 세로 크기 자동으로 조정 */
  max-height: 100%; /* 세로 크기 100% */
`;

const CommonStart = ({onClick} ) => {

  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.pathname.slice(1);
  const isHost = location.state.isHost;

  const [userName, setUserName] = useState('이름모를유저' + Math.floor(Math.random() * 100));

  // username 받으려고 handlechange 추가한거임 //

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  
  const videoRef = useRef(null);
  const audioRef = useRef(null);


  useEffect(()=>{
    getUserCamera();
    getUserAudio();
  }, [videoRef, audioRef])

  const getUserCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCamOn(true);

      videoRef.current.style.transform = 'scaleX(-1)';
    }
    
    catch (error) {
      console.error("Failed to start video: ", error);
    }
  }

  const getUserAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioRef.current.srcObject = stream;
      setIsMicOn(true);
    }
    catch (error) {
      console.error("Failed to start audio: ", error);
    }
  }

  const handleMicToggle = () => {
    const micOn = !isMicOn;
    setIsMicOn(micOn)
    const tracks = audioRef.current.srcObject.getTracks();
    tracks.forEach((track) => {
      track.enabled = micOn;
    });
  };

  const handleCamToggle = () => {
    const camOn = !isCamOn;
    setIsCamOn(camOn);
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => {
      track.enabled = camOn;
    });
  };



  return (
    <Background>
      <StyledStartPage>
        <StyledHeader>
          <Logo src={logoImage} alt="로고" />
        </StyledHeader>

        <StyledContent>
          <LeftSection>
          <CamCat />
          </LeftSection>
          <RightSection>
            <DivWrapper>
              <LeftPart style={{ backgroundImage: `url(${usernicknameImage})` }}></LeftPart>
              <RightPart style={{ backgroundSize: '85%', backgroundImage: `url(${usernicknameinputImage})` }}>
            {/* Input field */}
            <input
              type="text"
              value={userName}
              onChange={handleChange}
              placeholder="Enter your nickname"
            />
            </RightPart>
            </DivWrapper>
            <DivWrapper>
              <LeftPart style={{ backgroundImage: `url(${camImage})` }}></LeftPart>
              <RightPart onClick={handleCamToggle} style={{ backgroundImage: `url(${isCamOn ? onImage : offImage})` }}></RightPart>
            </DivWrapper>
            <DivWrapper>
              <LeftPart style={{ backgroundImage: `url(${micImage})` }}></LeftPart>
              <RightPart onClick={handleMicToggle} style={{ backgroundImage: `url(${isMicOn ? onImage : offImage})` }}></RightPart>
            </DivWrapper>
            <DivWrapper>
              {/* 조건부 렌더링을 사용하여 버튼 선택 */}
              <GoroomButton isHost={isHost} roomId={roomId} onClick={onClick}/>
            </DivWrapper>
          </RightSection>
        </StyledContent>
      </StyledStartPage>
    </Background>
  );
};

export default CommonStart;