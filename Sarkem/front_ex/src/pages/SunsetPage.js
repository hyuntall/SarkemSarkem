import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';
import Background from '../components/backgrounds/BackgroundSunset';
import CamButton from '../components/buttons/CamButton';
import MicButton from '../components/buttons/MicButton';
import SunMoon from '../components/games/SunMoon';
import ScMini from '../components/games/ScMini';
import CamCat from '../components/camera/camcat';
import { useNavigate } from 'react-router-dom';
import { useRoomContext } from '../Context';
import TempButton from '../components/buttons/TempButton';
import { useGameContext } from '../GameContext';
import LogButton from '../components/buttons/LogButton';
import Log from '../components/games/Log';
import SunsetPopup from '../components/games/SunsetPopup';
import { AgreeButton, DisagreeButton } from '../components/buttons/agreeDisagreeButtons.js';
import loadingimage from '../img/loading1.jpg';




const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative; /* position을 relative로 설정합니다. */
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const CamCatGrid = styled.div`
  // position : absolute;
  display: grid;
  // align-items: center;
  justify-items: center;
  // overflow: hidden;
  ${({ style }) =>
    style && `
    width: ${style.width};
    height : ${style.height};
    max-height: ${style.maxHeight};
    left : ${style.left};
    top : ${style.top};
  `}
`;

const calculateGrid = (camCount) => {

  if (camCount === 1) {
    return {
      width: '100%',
    };
  } else if (camCount === 2) {
    return {
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 1fr',
      width: '100%',
      left: '2%',
    };
  } else if (camCount === 3) {
    return {
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 1fr 1fr',
      width: '100%',
      left: '2%',
    };
  } else if (camCount === 4) {
    return {
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    };
  } else if (camCount === 5) {
    return {
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    };
} else if (camCount === 6) {
    return {
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    };
  } else if (camCount === 7) {
    return {
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
    };
  } else if (camCount === 8) {
    return {
      gridTemplateRows: '1fr 1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr',
      width : '100%',
    };
  } else if (camCount === 9) {
    return {
      gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr',
      width : '100%',
    };
  } else if (camCount === 10) {
    return {
      gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr',
      width : '100%',
    };
  } else {
    return {
    };
  }
};
const CamCatWrapper = styled.div`
  ${({ camCount, index }) =>

  camCount === 2 && index === 0
  ? `
    position: relative;
    left : 5%;
  `
  :
  camCount === 2 && index === 1
  ? `
    position: relative;
    right : 5%;
  `
  :

  camCount === 3 && index === 0
  ? `
    position: relative;
    width : 70%;
    top : 22.5%;
  `
  :
  camCount === 3 && index === 1
  ? `
    position: relative;
    width : 150%;
  `
  :
  camCount === 3 && index === 2
  ? `
    position: relative;
    width : 70%;
    top : 22.5%;
  `
  :
  camCount === 4 && index === 0
  ? `
    position: relative;
    width : 70%;
    left : 20%;
  `
  :
  camCount === 4 && index === 1
  ? `
    position: relative;
    width : 70%;
    right : 80%;
    top : 55%;
  `
  :
  camCount === 4 && index === 2
  ? `
    position: relative;
    width : 170%;
    right : 40%;

  `
  :
  camCount === 4 && index === 3
  ? `
    position: relative;
    width : 70%;
    top : 25%;
    right : 10%;
  `
  :
  camCount === 5 && index === 0
  ? `
    position: relative;
    width : 90%;
    left : 45%;
  `
  :
  camCount === 5 && index === 1
  ? `
    position: relative;
    width : 90%;
    right : 55%;
    top : 50%;
  `
  :
  camCount === 5 && index === 2
  ? `
    position: relative;
    width : 250%;
    left : center;
  `
  :
  camCount === 5 && index === 3
  ? `
    position: relative;
    width : 90%;
    left : 45%;
  `
  :
  camCount === 5 && index === 4
  ? `
    position: relative;
    width : 90%;
    right : 55%;
    top : 50%;
  `
  :
  camCount === 6 && index === 0
  ? `
    position: relative;
    left : 55%;
  `
  :
  camCount === 6 && index === 1
  ? `
    position: relative;
    right : 45%;
    top : 55%;
  `
  :
  camCount === 6 && index === 2
  ? `
    position: relative;
    width : 300%;
    left : 45%;
  `
  :
  camCount === 6 && index === 3
  ? `
    position: relative;
    left : 125%;
    top : 55%;
  `
  :
  camCount === 6 && index === 4
  ? `
    position: relative;
    left : 25%;
  `
  :
  camCount === 6 && index === 5
  ? `
    position: relative;
    top : 25%;
  `
  :
  camCount === 7 && index === 0
  ? `
    position: relative;
    left : 100%;

  `
  :
  camCount === 7 && index === 1
  ? `
    position: relative;
    top : 30%;
    right : 100%;

  `
  :
  camCount === 7 && index === 2
  ? `
    position: relative;
    right : 100%;
    top : 60%;

  `
  :
  camCount === 7 && index === 3
  ? `
    position: relative;
    width : 300%;
    left : 5%;
  `
  :
  camCount === 7 && index === 4
  ? `
    position: relative;
    left : 100%;

  `
  :
  camCount === 7 && index === 5
  ? `
    position: relative;
    left : 100%;
    top : 30%;

  `
  :
  camCount === 7 && index === 6
  ? `
    position: relative;
    right : 100%;
    top : 60%;
  `
  :
  camCount === 8 && index === 0
  ? `
    position: relative;
    width : 30%;
    top : 40%;
    right : 15%;

  `
  :
  camCount === 8 && index === 1
  ? `
    position: relative;
    width : 30%;
    left : 30%;

  `
  :
  camCount === 8 && index === 2
  ? `
    position: relative;
    width : 30%;
    top : 60%;
    right : 6%;

  `
  :
  camCount === 8 && index === 3
  ? `
    position: relative;
    width : 30%;
    left : 2%;

  `
  :
  camCount === 8 && index === 4
  ? `
    position: relative;
    width : 30%;
    top : 85%;
    right : 15%;

  `
  :
  camCount === 8 && index === 5
  ? `
    position: relative;
    width : 30%;
    left : 2%;

  `
  :
  camCount === 8 && index === 6
  ? `
    position: relative;
    width : 100%;
    left : 50%;
    bottom : 85%;

  `
  :
  camCount === 8 && index === 7
  ? `
    position: relative;
    width : 30%;
    left : 30%;

  `
  :
  camCount === 9 && index === 0
  ? `
    position: relative;
    top : 5.5%;
    right : 20%;
    width : 27.5%;
  `
  :
  camCount === 9 && index === 1
  ? `
    position: relative;
    width : 27.5%;
    left : 15%;
    top : 5.5%;
  `
  :
  camCount === 9 && index === 2
  ? `
    position: relative;
    width : 27.5%;
    top : 5.5%;
    right : 5%;

  `
  :
  camCount === 9 && index === 2
  ? `
    position: relative;
    width : 27.5%;
    top : 5.5%;
  `
  :
  camCount === 9 && index === 3
  ? `
    position: relative;
    width : 27.5%;
    top : 5.5%;
  `
  :
  camCount === 9 && index === 4
  ? `
    position: relative;
    width : 27.5%;
    top : 5.5%;
    right : 5%;
  `
  :
  camCount === 9 && index === 5
  ? `
    position: relative;
    width : 27.5%;
    top : 5.5%;
  `
  :
  camCount === 9 && index === 6
  ? `
    position: relative;
    width : 27.5%;
    top : 5.5%;
    right : 15%;
    right : 20%;
  `
  :
  camCount === 9 && index === 7
  ? `
    position: relative;
    width : 27.5%;
    top : 5.5%;
    left : 15%;
  `
  :
  camCount === 9 && index === 8
  ? `
    position: relative;
    width : 80%;
    left : 50%;
    bottom : 125%;
  `
  :
  camCount === 10 && index === 0
  ? `
    position: relative;
    width : 25%;
    right : 30%;
  `
  :
  camCount === 10 && index === 1
  ? `
    position: relative;
    width : 25%;
    left : 25%;
  `
  :
  camCount === 10 && index === 2
  ? `
    position: relative;
    width : 25%;
  `
  :
  camCount === 10 && index === 3
  ? `
    position: relative;
    width : 25%;
  `
  :
  camCount === 10 && index === 4
  ? `
    position: relative;
    width : 25%;
  `
  :
  camCount === 10 && index === 5
  ? `
    position: relative;
    width : 25%;
    left : 25%;
  `
  :
  camCount === 10 && index === 6
  ? `
    position: relative;
    width : 25%;
    right : 30%;
  `
  :
  camCount === 10 && index === 7
  ? `
    position: relative;
    width : 25%;
  `
  :
  camCount === 10 && index === 8
  ? `
    position: relative;
    width : 80%;
    left : 50%;
    bottom : 100%;
  `
  :
  camCount === 10 && index === 9
  ? `
    position: relative;
    width : 25%;
    left : 25%;
  `
  : ''};
  `;

  const TimeSecond = styled.text`
  color: #FFFFFF;
  text-align: left;
  font: 400 42px "RixInooAriDuriR", sans-serif;
  position: absolute; /* position을 absolute로 설정합니다. */
  left: 22px; /* 원하는 위치 값을 지정합니다. */
  top: 90px; /* 원하는 위치 값을 지정합니다. */
`;

const SunsetPage = () => {
   
  const { roomSession, player, setPlayer, players, leaveSession } = useRoomContext(); 
  const { startVote, agreeExpulsion, disagreeExpulsion, targetId, chatVisible } = useGameContext();
  const [targetIndex, setTargetIndex] = useState(null);
  
  const navigate = useNavigate();
  
  const assignedIndices = [];
  const camCount = players.size; // camCount를 SunsetPage 내부에서 계산
  const gridStyles = calculateGrid(camCount);

  let displayCamCat = false;

  useEffect(() => {
    if (roomSession.roomId === undefined){
      console.log("세션 정보가 없습니다.")
      navigate("/");
      return;
    }
    // 윈도우 객체에 화면 종료 이벤트 추가
    window.addEventListener('beforeunload', onbeforeunload);
    return () => {
        window.removeEventListener('beforeunload', onbeforeunload);
    }
  }, []);


  const handleCamButtonClick = () => {
    const camOn = !player.isCamOn;
    setPlayer((prevState) => {
      return {...prevState,
        isCamOn: camOn,
      };
    });
    if (player.stream) {
      player.stream.publishVideo(camOn);
    }
  };
  
  
  const handleMicButtonClick = () => {
    const micOn = !player.isMicOn;
    setPlayer((prevState) => {
      return {...prevState,
        isMicOn: micOn,
      };
    });
    if (player.stream) {
      player.stream.publishAudio(micOn);
    }
  };

  const [isLogOn, setIsLogOn] = useState(true);
  const handleLogButtonClick = () => {
    setIsLogOn((prevIsLogOn) => !prevIsLogOn);
  };
  

  // 화면을 새로고침 하거나 종료할 때 발생하는 이벤트
  const onbeforeunload = (event) => {
    leaveSession();
  }
  const generateRandomPositionIndex = (maxIndex) => {
    return Math.floor(Math.random() * maxIndex);
  };
  return (
    <Background>
      <StyledContent>
      {!isLogOn && <Log top="60%" left="26%" />}
      <SunMoon alt="SunMoon"></SunMoon>
      <TimeSecond>60s</TimeSecond>
      <CamButton alt="Camera Button" onClick={handleCamButtonClick} isCamOn={player.isCamOn} />
      <MicButton alt="Mic Button" onClick={handleMicButtonClick} isMicOn={player.isMicOn}/>
      <LogButton alt="Log Button"onClick={handleLogButtonClick} isLogOn={isLogOn}></LogButton>
      {/* <SunsetPopup></SunsetPopup>
        <CamCatGrid style={gridStyles}>
          {camArray && camArray.map((user, index) => (
            <CamCatWrapper key={index} camcount={camCount} index={index}>
              <CamCat props={user} />
            </CamCatWrapper>
          ))}
        </CamCatGrid> */}
        {/* {getMyRole()}
      </StyledContent>
      <ChatButtonAndPopup /> */}
      {/* </CamCatGridContainer> */}

      <CamCatGrid style={gridStyles}>
        {players && Array.from(players.keys()).map((id, index) => {
          let targetIndex = null;
          if (id === targetId) {
            if (camCount === 3) {
              targetIndex = 1;
            } else if (camCount >= 4 && camCount <= 6) {
              targetIndex = 2;
            } else if (camCount === 7) {
              targetIndex = 3;
            } else if (camCount === 8) {
              targetIndex = 6;
            } else if (camCount === 9) {
              targetIndex = 8;
            } else if (camCount === 10) {
              targetIndex = 8;
            }
          }

          let positionIndex;

          if (targetIndex === null) {
            if (camCount === 3) {
              // 이미 배정된 인덱스 제외 후 랜덤 배정
              const availableIndices = [0, 2].filter(i => !assignedIndices.includes(i));
              positionIndex = generateRandomPositionIndex(availableIndices.length);
              positionIndex = availableIndices[positionIndex];

              // 배정된 인덱스를 추가
              assignedIndices.push(positionIndex);
            } else if (camCount >= 4 && camCount <= 6) {
              // 이미 배정된 인덱스 제외 후 랜덤 배정
              const availableIndices = [0, 1, 3, 4].filter(i => !assignedIndices.includes(i));
              positionIndex = generateRandomPositionIndex(availableIndices.length);
              positionIndex = availableIndices[positionIndex];

              // 배정된 인덱스를 추가
              assignedIndices.push(positionIndex);
            }
          } else {
            positionIndex = targetIndex; // 이미 배정된 경우에는 해당 인덱스 사용
            assignedIndices.push(positionIndex); // 이미 배정된 경우에도 인덱스 추가
          }

          if (assignedIndices.length === camCount) {
            displayCamCat = true;
          } else {
            displayCamCat = false;
          }

          console.log(`타겟아이디 : ${targetId}, User Token: ${id}, Target Index: ${targetIndex}, Position Index: ${positionIndex}`, "확인하세요");

          return (
            <CamCatWrapper camCount={camCount} index={positionIndex}>
              <CamCat id={id} />
            </CamCatWrapper>
          );
        })}
      </CamCatGrid>

      <div>
        <AgreeButton onClick={startVote ? agreeExpulsion : null} disabled={!startVote} />
        <DisagreeButton onClick={startVote ? disagreeExpulsion : null} disabled={!startVote} />
      </div>
      <ScMini />
      </StyledContent>
      <TempButton url={`/${roomSession.roomId}/night`} onClick={() => navigate(`/${roomSession.roomId}/night`)}/>
      {chatVisible()}
      </Background>
      );
};

export default SunsetPage;