import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CamCat from './camcat';
import voteImage from '../../img/votefoot.png';
import { useGameContext } from '../../GameContext';
import { useRoomContext } from '../../Context';
import Jungle from '../job/Detective';
import { VoteButton, SkipButton, SmallSkipButton } from '../buttons/VoteButton.js';
import skipClearImg from '../../img/tb_endskip.png';
import voteClearImg from '../../img/tb_endvote.png';


const CamCatGrid = styled.div`
    // overflow : hidden;
    position : absolute;
    display: grid;
    align-items: center;
    justify-items: center;
    ${({ style }) =>
    style && `
      width: ${style.width};
      height : ${style.height};
      max-height: ${style.maxHeight};
      left : ${style.left};

  `}
`;

const VoteImage = styled.img`
  width: 35%;
  // height: 60%;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 20px; /* Adjust the value as needed */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const VotefootWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const VotefootImage = styled.img`
  position: absolute;
  top: 93%;
  left: 60%;
  transform: translate(-50%, -50%);
`;


const calculateGrid = (camCount) => {
  if (camCount === 1) {
    return {
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr',
      height: '100%',
      width: '100%',
    };
  } else if (camCount === 2) {
    return {
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 1fr',
      width: '90%',
    };
  } else if (camCount === 3) {
    return {
      gridTemplateRows: '1fr 1fr',
      gridTemplateColumns: '1fr 1fr',
      width: '59%',
      gridRowGap : '6%',
      gridColumnGap : '5%',
    };
  } else if (camCount === 4) {
    return {
      gridTemplateRows: '1fr 1fr',
      gridTemplateColumns: '1fr 1fr',
      width: '55%',
      gridRowGap : '7%',
      gridColumnGap : '5%',
    };
  } else if (camCount === 5) {
    return {
      gridTemplateRows: '1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr',
      width: '75%',
      gridRowGap: '7%',

    };
  } else if (camCount === 6) {
    return {
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr',
      top: '7.5%',
      width: '80%',
      gridRowGap: '7%',
      bottom: '1%',
    };
  } else if (camCount === 7) {
    return {
      gridTemplateRows: '1fr 1fr',
      gridTemplateColumns: 'repeat(4, 1fr)',
      width: '90%',
      gridRowGap: '7%',
    };
  } else if (camCount === 8) {
    return {
      gridTemplateRows: 'repeat(2, 1fr)',
      gridTemplateColumns: 'repeat(4, 1fr)',
      width: '85%',
      gridRowGap: '8%',
      bottom: '17%',
    };
  } else if (camCount === 9) {
    return {
      gridTemplateRows: 'repeat(2, 1fr)',
      gridTemplateColumns: 'repeat(5, 1fr)',
      width: '95%',
      gridRowGap: '7%',
      height: '70%',
    };
  } else if (camCount === 10) {
    return {
      gridTemplateRows: 'repeat(2, 1fr)',
      gridTemplateColumns: 'repeat(5, 1fr)',
      left: '5%',
      width: '90%',
      height: '70%',
      gridRowGap: '3%',
      bottom: '15%',
    };
  } else {
    // Add more cases as needed
    return {
      gridTemplateRows: '1fr 1fr',
      gridTemplateColumns: '1fr 1fr',
    };
  }
};

const CamCatWrapper = styled.div`
  position : relative;
  ${({ camCount, index }) =>

  camCount === 3 && index === 0
  ? `
  position: relative;
  left : 56.5%;
  `
  :
  camCount === 3 && index === 1
  ? `
  position: relative;
  top : 112.5%;
  `
  :
  camCount === 3 && index === 2
  ? `
  position: relative;
  `
  :
  camCount === 5 && index === 0
  ? `
  position: relative;
  left : 50%;
  `
  :
  camCount === 5 && index === 1
  ? `
  position: relative;
  left : 50%;
  `
  :
  camCount === 5 && index === 2
  ? `
  position: relative;
  top : 114%;
  `
  :
  camCount === 7 && index === 0
  ? `
  position: relative;
  left : 50%;
  `
  :
  camCount === 7 && index === 1
  ? `
  position: relative;
  left : 50%;
  `
  :
  camCount === 7 && index === 2
  ? `
  position: relative;
  left : 50%;
  `

  :
  camCount === 7 && index === 3
  ? `
  position: relative;
  top : 114%;
  `
  :
  camCount === 9 && index === 0
  ? `
  position: relative;
  left : 50%;
  `
  :
  camCount === 9 && index === 1
  ? `
  position: relative;
  left : 50%;
  `
  :
  camCount === 9 && index === 2
  ? `
  position: relative;
  left : 50%;
  `
  :
  camCount === 9 && index === 3
  ? `
  position: relative;
  left : 50%;
  `
  :
  camCount === 9 && index === 4
  ? `
  position: relative;
  top : 115%;
  `
  : ''};
  `;

const DayNightCamera = React.memo(({ players }) => {
  const { player } = useRoomContext();
  const gridStyles = calculateGrid(players.length);
  const [clickedCamera, setClickedCamera] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { selectAction, selectConfirm, setSelectedTarget,
    startVote, dayCount, predictWebcam, stopPredicting,
    phase, jungleRefs, mixedMediaStreamRef, audioContext,
    hiddenMission, loadGestureRecognizer, uniquePlayers } = useGameContext();
    
  useEffect(() => {
    uniquePlayers();
    setIsConfirmed(false);
    setClickedCamera(null);
    setIsSkipped(false);

    if (phase === "night") {
      // 모두의 카메라, 마이크 설정
      nightCamAudio();
      // 마피아 넣는 작업
      let sarkArray = [];
      for (let player of players) {
        if (player.role === "SARK") sarkArray.push(player);
      }

      if (player.current.role === "DETECTIVE") {
        changeVoice(sarkArray);
      }

      return () => {
        for (let otherPlayer of players) {
          if (player.current === otherPlayer) continue;
          
          if (otherPlayer.role === 'SARK'){
            otherPlayer.stream.off('streamPropertyChanged', handleSarksCam);
          }
        }
      };
    }
    else if (phase === "day") {
      dayCamAudio();
      stopVoiceChange();
    }

    
  }, [startVote, phase]);

  useEffect(() => {
    if (hiddenMission) {
      loadGestureRecognizer();
      startHiddenMission();
    } else {
      stopHiddenMission();
    }
  }, [hiddenMission])



  const handleCamClick = (id) => {
    if (!startVote || (dayCount === 1 && phase === "day") || isConfirmed || isSkipped || player.current.role === "OBSERVER") {
      return;
    }

    if (clickedCamera === id) {
      setClickedCamera(null);
      selectAction({ playerId: null });
    }
    else {
      setClickedCamera(id);
      selectAction({ playerId: id });
    }
  };

  const handleConfirmClick = () => {
    if (clickedCamera && !isConfirmed || player.current.role === "OBSERVER") {
      setIsConfirmed(true);
      selectConfirm();
    }
  };

  const handleSkipClick = () => {
    if (!isConfirmed && !isSkipped && startVote || player.current.role === "OBSERVER") {
      setIsSkipped(true);
      setClickedCamera(null);
      setSelectedTarget("");
      selectAction({ playerId: null });
      selectConfirm();
    }
  };

  const startHiddenMission = () => {
    predictWebcam();
  }
  const stopHiddenMission = () => {
    stopPredicting();
  }

  const handleSarksCam = (sark) => {
    sark.target.subscribeToVideo(false);
  }

  const nightCamAudio = () => {
    if (player.current.role === "DETECTIVE") {
      setIsMuted(true);
      // 탐정 플레이어 화면에서 모두의 캠을 끄고, 마피아를 제외한 생존자의 마이크를 끈다.
      for (let otherPlayer of players) {
        if (player.current === otherPlayer) continue;

        otherPlayer.stream.subscribeToVideo(false);

        if (otherPlayer.role !== "SARK") {
          otherPlayer.stream.subscribeToAudio(false);
        } else {
          otherPlayer.stream.on('streamPropertyChanged', handleSarksCam);
        }
      }
    }
    else if (player.current.role === "SARK" || player.current.role === "OBSERVER") {
      for (let otherPlayer of players) {
        if (player.current === otherPlayer) continue;
        if (otherPlayer.role !== "SARK") {
          otherPlayer.stream.subscribeToVideo(false);
          otherPlayer.stream.subscribeToAudio(false);
        }
      }
    }
    else {
      // 마피아, 탐정, 관전자를 제외한 나머지 플레이어의 화면에서 모두의 캠, 오디오를 끈다.
      for (let otherPlayer of players) {
        if (player.current === otherPlayer) continue;
        otherPlayer.stream.subscribeToVideo(false);
        otherPlayer.stream.subscribeToAudio(false);
        if (otherPlayer.role === 'SARK') otherPlayer.stream.on('streamPropertyChanged', handleSarksCam);
      }
    }
  }


  const dayCamAudio = () => {
    setIsMuted(false);
    for (let otherPlayer of players) {
      if (player.current === otherPlayer) continue;  // 내가 아닌 경우에만 설정
      if (otherPlayer.role === "OBSERVER") continue;  // 관전자가 아닌 경우에만 설정

      otherPlayer.stream.subscribeToVideo(true);
      otherPlayer.stream.subscribeToAudio(true);
    }
  }

  //찐시작
  const changeVoice = (sarkArray) => {
    mixedMediaStreamRef.current = getMixedMediaStream(sarkArray);
  }

  // 삵들에 대해 음성변조 시작
  const getMixedMediaStream = (sarkArray) => {
    sarkArray.forEach((sark) => {
      const mediaStream = sark.stream.stream.mediaStream;

      const audioTrack = mediaStream.getAudioTracks()[0];
      const source = audioContext.createMediaStreamSource(new MediaStream([audioTrack]));
      const jungle = new Jungle(audioContext);
      jungle.setPitchOffset(1);
      source.connect(jungle.input);
      jungle.output.connect(audioContext.destination);
      jungle.isConnected = true;
      jungleRefs.current.push(jungle);
    });
  }

  // 음성 변조 중지
  const stopVoiceChange = () => {
    jungleRefs.current.forEach((jungle) => {
      if (jungle && jungle.isConnected) {
        jungle.output.disconnect(audioContext.destination);
        jungle.isConnected = false;
      }
    });
    jungleRefs.current = [];
    mixedMediaStreamRef.current = null;
  };

  return (
    <CamCatGrid style={gridStyles}>
      {players && players.map((otherPlayer, index) => (
        <CamCatWrapper
          key={index}
          camCount={players.length}
          user={otherPlayer.playerId}
          index={index}
          onClick={() => handleCamClick(otherPlayer.playerId)}
        >
          <CamCat id={otherPlayer.playerId} isMuted={isMuted}/>
          {!((player.current.role === "SARK" && phase === "night") || (player.current.role === "OBSERVER" && phase === "night")) && (
            <VotefootWrapper show={clickedCamera === otherPlayer.playerId && startVote}>
              <VotefootImage src={voteImage} alt="Vote" />
            </VotefootWrapper>
          )}
          {/* <VotefootWrapper show={clickedCamera === otherPlayer.playerId && startVote}>
            <VotefootImage src={voteImage} alt="Vote" />
          </VotefootWrapper> */}
        </CamCatWrapper>
      ))}
      
      {player.current.role !== "OBSERVER" && (
        <ButtonWrapper>
          {dayCount === 1 && phase === 'day' ? (
            <>
              {isSkipped ? (
                <VoteImage src={skipClearImg} alt="skip end" />
              ) : (
                <>
                  {startVote && (
                    <SmallSkipButton onClick={handleSkipClick} disabled={isConfirmed || isSkipped} />
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {isConfirmed || isSkipped ? (
                <VoteImage src={isSkipped ? skipClearImg : voteClearImg} alt="Skipped or voted over image" />
              ) : (
                <>
                  {startVote && (
                    <VoteButton onClick={handleConfirmClick} disabled={!clickedCamera || isSkipped} />
                  )}
                  {startVote && (
                    <SkipButton onClick={handleSkipClick} disabled={isConfirmed || isSkipped} />
                  )}
                </>
              )}
            </>
          )}
        </ButtonWrapper>
      )}
    </CamCatGrid>
  );
});

export default DayNightCamera;
