import React, { useState, useEffect } from 'react';
import camcatImage from '../../img/camcat2.png';
import OpenViduVideoComponent from './OvVideo';
import { loadModels, faceMyDetect, stopFace } from '../job/Psychologist';
import styled from 'styled-components';
import { useGameContext } from '../../GameContext';
import { useRoomContext } from '../../Context';

const Box = styled.div
  `
  position: absolute;
  border: 2px solid red;
`;


const CamCat = ({id}) => {
  const { players, player } = useRoomContext();
  const { voteSituation, phase } = useGameContext();
  const current = players.current.get(id);
  const stream = current.stream;


  const getVoteResultForUser = (id) => {
    if (phase === 'day') {
      if (voteSituation && voteSituation[id] !== undefined) {
        return `X  ${voteSituation[id]}`;
      }
      return `X 0`;

    }
      else if (phase === 'night') {
        if (player.current.role === "SARK" || player.current.role === "OBSERVER") {
          if (voteSituation[id]) {
            return `삵이 죽일 사람`;
          }
          return '';
        }
        return ''; // sark나 observer가 아닌 경우
      }
    
      return ''; // day나 night가 아닌 경우
    };

  return (
      <div
        style={{
          position: 'relative',
          overflow: 'visible',
          display: 'flex',
          justifyContent: 'center',
          backgroundRepeat: 'no-repeat',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
          height: '100%',
        }}
      >
        <div
          className="streamcomponent"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderStyle: 'solid',
            borderRadius: '10%',
            borderWidth: '0.7em',
            borderColor: '#343434',
            backgroundColor: 'white',
            position: 'relative',
          }}
        >
          {/* 이미지 위치 변경 */}
          <div
            style={{
              flex: 0.34,
              position: 'absolute',
              top: '-15%',
              left: '-3%',
              width: '106%',
              height: '34%',
              overflow: 'visible',
              display: 'flex',
              justifyContent: 'center',
              zIndex : '1',
            }}
          >
            <img
              src={camcatImage}
              alt="CamCat"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>
          <div style={{ flex: 0.6 }}>
            <OpenViduVideoComponent streamManager={stream} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '3px' }}>
            <div style={{ flex: 1, textAlign: 'right' }}>
              {current.nickName}
            </div>
            <div style={{ flex: 0.8, textAlign: 'center' }}>
              {getVoteResultForUser(current.playerId)}
            </div>
          </div>
        </div>
      </div>
  );
}

export default CamCat;
