package com.a702.sarkem.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.a702.sarkem.model.gameroom.GameRoom;
import com.a702.sarkem.model.player.Player;
import com.a702.sarkem.service.GameManager;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class MainController {

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }
	
    Map paramMap = new HashMap<>();
    
	// gameManager
	private final GameManager gameManager;

	// 방 생성 createGameRoom
    @PostMapping("/api/game")
    public ResponseEntity<String> createGameRoom(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
    	//Openvidu Session
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);

        //Game Session
        gameManager.createGameRoom(session.getSessionId());
        String roomId = session.getSessionId();
        System.out.println("방생성");
        return new ResponseEntity<>(roomId, HttpStatus.OK);
    }
    
    // 방 획득 retrieveGameRoom
    @GetMapping("/api/game/{roomId}")
    public ResponseEntity<GameRoom> retrieveGameRoom(@PathVariable("roomId") String roomId,
    		@RequestBody(required = false) Map<String, Object> params)
    				throws OpenViduJavaClientException, OpenViduHttpException {
    	Session session = openvidu.getActiveSession(roomId);
    	if (session == null) {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    	System.out.println(gameManager.getGameRoom(roomId));
    	System.out.println("방획득");
    	return new ResponseEntity<>(gameManager.getGameRoom(roomId), HttpStatus.OK);
    }
    
    // 방 접속 connectRoom(@RequestParam String roomId, Player player)
    @PostMapping("/api/game/{roomId}/player")
    public ResponseEntity<String> connectRoom(@PathVariable("roomId") String roomId,
    		@RequestBody String nickName)
    				throws OpenViduJavaClientException, OpenViduHttpException{
    	Session session = openvidu.getActiveSession(roomId);

		// 해당 roomId에 대한 세션이 없을 시 return;
    	if (session == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

		// 토큰 발급
    	String token = getConnectionToken(session, paramMap);
		String playerId = token.split("token=")[1];	// 토큰 앞부분 삭제
    	Player player = new Player(playerId, nickName);

    	log.debug(player.toString());

		// 해당 게임 세션에 player 연결
    	gameManager.connectPlayer(roomId, player);

		// 해당 게임 세션에 host가 없을 시 현재 player를 host로 지정
		if(gameManager.getHostId(roomId) == null) gameManager.setHostId(roomId,playerId);
    	System.out.println("방접속");
    	return new ResponseEntity<>(token, HttpStatus.OK);
    }
    
    
    //게임방 모든 유저 정보 조회
    @GetMapping("/api/game/{roomId}/player")
    public ResponseEntity<List<Player>> retrieveGamePlayers(@PathVariable("roomId") String roomId,
    		@RequestBody(required = false) Map<String, Object> params)
    				throws OpenViduJavaClientException, OpenViduHttpException {
    	Session session = openvidu.getActiveSession(roomId);
    	if (session == null) {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    	System.out.println(gameManager.getGameRoom(roomId).getPlayers());
    	System.out.println("전체유저");
    	return new ResponseEntity<>(gameManager.getGameRoom(roomId).getPlayers(), HttpStatus.OK);
    }
    
    //게임방 자신 정보 조회
    @GetMapping("/api/game/{roomId}/player/{playerId}")
    public ResponseEntity<Player> retrieveGamePlayer(@PathVariable("roomId") String roomId,
    		@PathVariable("playerid") String playerId)
    				throws OpenViduJavaClientException, OpenViduHttpException {
    	Session session = openvidu.getActiveSession(roomId);
    	if (session == null) {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    	Player player = gameManager.getGameRoom(roomId).getPlayer(playerId);
    	return new ResponseEntity<>(player, HttpStatus.OK);
    }
    
    //게임방 나갔을때
    @DeleteMapping("/api/game/{roomId}/player/{playerId}")
    public void exitGame(@PathVariable("roomId") String roomId, @PathVariable("playerId") String playerId) {
    	gameManager.deletePlayer(roomId, playerId);

		System.out.println("게임방 나감");
    }
    
        
    //토큰 생성하기&가져오기
    public String getConnectionToken(Session session, Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException{
    	ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return connection.getToken();
    }
    
	// TEST:
	@PostMapping("/test/gameroom")
	public void testCreateGameRoom() {
		gameManager.createGameRoom("testroom");
	}
}
