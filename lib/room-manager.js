// lib/room-manager.js
// Authoritative Match & Room Engine for TAKE THE LEAD (Aura Rush Multiplayer)

import { DEFAULT_POWER_CARDS, PLAYER_COLORS, PLAYER_AVATARS } from './types';
import { pickMultiplayerMatchDeck, MULTIPLAYER_CHALLENGE_BANK } from './multiplayer-challenges';

const globalRooms = {};
const sseSubscribers = {};
const sseSubscriberMap = {};
const roomMatchDecks = {};

export function generateUniqueRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  do {
    let rand = '';
    for (let i = 0; i < 4; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    code = `AURA${rand}`;
  } while (globalRooms[code]);
  return code;
}

export function getOrCreateRoom(code, hostId = 'host', customHostToken = null) {
  const upperCode = code.toUpperCase();
  if (!globalRooms[upperCode]) {
    const hostToken = customHostToken || `ht_${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2)}`;
    globalRooms[upperCode] = {
      code: upperCode,
      hostId,
      hostToken,
      phase: 'LOBBY',
      startTime: null,
      endTime: null,
      currentRoundIndex: 0,
      totalRounds: 6,
      activeChallenge: null,
      roundStartTime: null,
      roundDurationMs: 8000,
      players: {},
      roundSubmissions: {},
      processedActionIds: new Set(),
      overtakeEvents: [
        {
          id: `evt_init_${Date.now()}`,
          timestamp: Date.now(),
          text: 'Lobby opened. Scan QR code to TAKE THE LEAD!',
          type: 'power',
        },
      ],
      spectatorHeadline: 'WAITING FOR SQUAD TO SCAN & JOIN...',
      allTimeHighScore: 8420,
      allTimeChampion: 'SOHAM',
    };
  }
  return globalRooms[upperCode];
}

export function getRoom(code) {
  return globalRooms[code.toUpperCase()] || null;
}

// -------------------------------------------------------------
// SANITIZED MOBILE PLAYER PROJECTION (ZERO SECRET LEAKAGE)
// -------------------------------------------------------------
export function getPlayerProjection(room, playerId) {
  const player = room.players[playerId];
  if (!player) return null;

  const now = Date.now();
  const timeRemainingMs = room.roundStartTime
    ? Math.max(0, room.roundDurationMs - (now - room.roundStartTime))
    : 0;

  // Sorted Leaderboard
  const sortedPlayers = Object.values(room.players)
    .sort((a, b) => b.score - a.score)
    .map((p, idx) => ({
      id: p.id,
      name: p.name,
      score: p.score,
      rank: idx + 1,
      avatar: p.avatar,
      color: p.color,
      streak: p.streak,
    }));

  const myRank = sortedPlayers.findIndex((p) => p.id === playerId) + 1;
  player.rank = myRank || 1;

  // Sanitized Challenge: Options stripped of `correct` boolean!
  let sanitizedChallenge = null;
  if (room.activeChallenge) {
    const c = room.activeChallenge;
    sanitizedChallenge = {
      id: c.id,
      category: c.category,
      eyebrow: c.eyebrow,
      prompt: c.prompt,
      subtitle: c.subtitle,
      type: c.type,
      options: c.options?.map((opt) => ({
        text: opt.text,
      })),
      memoryFlashItems: c.memoryFlashItems,
      memoryQuestion: c.memoryQuestion,
      isStealRound: c.isStealRound,
      timeLimitMs: c.timeLimitMs,
    };
  }

  const hasAnswered = !!room.roundSubmissions[playerId];

  return {
    code: room.code,
    phase: room.phase,
    currentRoundIndex: room.currentRoundIndex,
    totalRounds: room.totalRounds,
    roundTimeRemainingMs: timeRemainingMs,
    myPlayer: {
      id: player.id,
      name: player.name,
      score: player.score,
      streak: player.streak,
      rank: player.rank,
      color: player.color,
      avatar: player.avatar,
      powerCards: player.powerCards,
      shieldActive: player.shieldActive,
      surgeActive: player.surgeActive,
      lastAnswerFeedback: player.lastAnswerFeedback,
    },
    challenge: sanitizedChallenge,
    leaderboard: sortedPlayers,
    answeredCurrentRound: hasAnswered,
  };
}

// -------------------------------------------------------------
// REAL-TIME SSE SUBSCRIPTION & BROADCASTING
// -------------------------------------------------------------
export function subscribeToRoom(code, target, callback) {
  const upperCode = code.toUpperCase();
  if (!sseSubscribers[upperCode]) {
    sseSubscribers[upperCode] = new Set();
    sseSubscriberMap[upperCode] = new Map();
  }

  sseSubscribers[upperCode].add(callback);
  sseSubscriberMap[upperCode].set(callback, target);

  const room = getRoom(upperCode);
  if (room) {
    if (target === 'host') {
      callback(room);
    } else {
      const projection = getPlayerProjection(room, target);
      if (projection) callback(projection);
    }
  }

  return () => {
    sseSubscribers[upperCode]?.delete(callback);
    sseSubscriberMap[upperCode]?.delete(callback);
  };
}

export function broadcastRoomUpdate(code) {
  const upperCode = code.toUpperCase();
  const room = globalRooms[upperCode];
  if (!room) return;

  if (sseSubscribers[upperCode]) {
    sseSubscribers[upperCode].forEach((cb) => {
      try {
        const target = sseSubscriberMap[upperCode]?.get(cb) || 'host';
        if (target === 'host') {
          cb(room);
        } else {
          const projection = getPlayerProjection(room, target);
          if (projection) cb(projection);
        }
      } catch (err) {
        console.error('Error in SSE broadcast:', err);
      }
    });
  }
}

// -------------------------------------------------------------
// PLAYER JOIN & LOBBY MANAGEMENT (MAX 6 PLAYERS)
// -------------------------------------------------------------
export function joinPlayer(code, playerId, name) {
  const upperCode = code.toUpperCase();
  const room = getOrCreateRoom(upperCode);

  // Reconnect check
  if (room.players[playerId]) {
    room.players[playerId].name = name;
    room.players[playerId].isConnected = true;
    room.players[playerId].lastSeen = Date.now();
    broadcastRoomUpdate(upperCode);
    return { player: room.players[playerId], room };
  }

  // Strict 6 Player Max Capacity
  const existingCount = Object.keys(room.players).length;
  if (existingCount >= 6) {
    throw new Error('ROOM FULL (6 players maximum)');
  }

  const colorIndex = existingCount % PLAYER_COLORS.length;
  const avatarIndex = existingCount % PLAYER_AVATARS.length;

  const newPlayer = {
    id: playerId,
    name: name.trim().slice(0, 15) || `Player ${existingCount + 1}`,
    score: 0,
    streak: 0,
    rank: existingCount + 1,
    color: PLAYER_COLORS[colorIndex],
    avatar: PLAYER_AVATARS[avatarIndex],
    isConnected: true,
    lastSeen: Date.now(),
    sessionToken: `st_${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2)}`,
    powerCards: JSON.parse(JSON.stringify(DEFAULT_POWER_CARDS)),
    shieldActive: false,
    surgeActive: false,
    lastAnswerFeedback: null,
  };

  room.players[playerId] = newPlayer;

  room.overtakeEvents.unshift({
    id: `join_${Date.now()}`,
    timestamp: Date.now(),
    text: `${newPlayer.name} ${newPlayer.avatar} joined the arena!`,
    type: 'power',
  });

  broadcastRoomUpdate(upperCode);
  return { player: newPlayer, room };
}

// -------------------------------------------------------------
// MATCH LIFECYCLE & ROUND PROGRESSION
// -------------------------------------------------------------
export function startGame(code, hostToken = null) {
  const upperCode = code.toUpperCase();
  const room = globalRooms[upperCode];
  if (!room) throw new Error('Room not found');
  if (hostToken && room.hostToken && hostToken !== room.hostToken) {
    throw new Error('Unauthorized hostToken');
  }

  const playerCount = Object.keys(room.players).length;
  if (playerCount < 1) {
    throw new Error('Minimum 1 player required to start');
  }

  // Reset player scores & power cards
  Object.values(room.players).forEach((p) => {
    p.score = 0;
    p.streak = 0;
    p.shieldActive = false;
    p.surgeActive = false;
    p.lastAnswerFeedback = null;
    p.powerCards = JSON.parse(JSON.stringify(DEFAULT_POWER_CARDS));
  });

  roomMatchDecks[upperCode] = pickMultiplayerMatchDeck(6);
  room.totalRounds = roomMatchDecks[upperCode].length;
  room.currentRoundIndex = 0;
  room.startTime = Date.now();
  room.phase = 'COUNTDOWN';
  room.spectatorHeadline = '⚡ GET READY TO TAKE THE LEAD!';

  broadcastRoomUpdate(upperCode);

  // 3-second countdown before Round 1 starts
  setTimeout(() => {
    launchNextRound(upperCode);
  }, 3000);
}

function launchNextRound(code) {
  const room = globalRooms[code];
  if (!room) return;

  const challenges = roomMatchDecks[code] || MULTIPLAYER_CHALLENGE_BANK;
  if (room.currentRoundIndex >= challenges.length) {
    // Game Completed -> Final Podium
    room.phase = 'PODIUM';
    room.activeChallenge = null;
    room.endTime = Date.now();

    const topPlayer = Object.values(room.players).sort((a, b) => b.score - a.score)[0];
    if (topPlayer && topPlayer.score > room.allTimeHighScore) {
      room.allTimeHighScore = topPlayer.score;
      room.allTimeChampion = topPlayer.name;
    }

    room.spectatorHeadline = topPlayer
      ? `🏆 ${topPlayer.name} TOOK THE LEAD WITH ${topPlayer.score.toLocaleString()} AURA!`
      : 'MATCH CONCLUDED!';

    broadcastRoomUpdate(code);
    return;
  }

  const challenge = challenges[room.currentRoundIndex];
  room.activeChallenge = challenge;
  room.currentRoundIndex += 1;
  room.phase = 'CHALLENGE_ACTIVE';
  room.roundStartTime = Date.now();
  room.roundDurationMs = challenge.timeLimitMs || 8000;
  room.roundSubmissions = {};

  room.spectatorHeadline = challenge.isStealRound
    ? `🔥 AURA STEAL SURGE: WINNER SIPHONS 400 AURA FROM LEADER!`
    : `ROUND ${room.currentRoundIndex}/${room.totalRounds}: ${challenge.prompt}`;

  broadcastRoomUpdate(code);

  // Schedule round end after time limit
  setTimeout(() => {
    evaluateRoundEnd(code, room.currentRoundIndex);
  }, room.roundDurationMs);
}

function evaluateRoundEnd(code, roundIdx) {
  const room = globalRooms[code];
  if (!room || room.currentRoundIndex !== roundIdx || room.phase !== 'CHALLENGE_ACTIVE') return;

  room.phase = 'ROUND_FEEDBACK';
  broadcastRoomUpdate(code);

  // 3-second feedback transition before next round
  setTimeout(() => {
    launchNextRound(code);
  }, 3000);
}

// -------------------------------------------------------------
// PLAYER ACTIONS & AURA SCORING ENGINE
// -------------------------------------------------------------
export function handlePlayerAction(code, payload) {
  const upperCode = code.toUpperCase();
  const room = globalRooms[upperCode];
  if (!room) throw new Error('Room not found');

  const player = room.players[payload.playerId];
  if (!player) throw new Error('Player not in room');
  if (payload.sessionToken && player.sessionToken && payload.sessionToken !== player.sessionToken) {
    throw new Error('Unauthorized sessionToken');
  }

  // Idempotency check
  if (payload.actionId) {
    if (room.processedActionIds.has(payload.actionId)) {
      return { success: true, message: 'Duplicate action ignored' };
    }
    room.processedActionIds.add(payload.actionId);
  }

  // 1. USE POWER CARD
  if (payload.type === 'USE_POWER_CARD' && payload.powerCardType) {
    const card = player.powerCards.find((c) => c.type === payload.powerCardType && !c.used);
    if (!card) return { success: false, message: 'Power card already used or unavailable' };

    card.used = true;
    if (payload.powerCardType === 'SURGE') {
      player.surgeActive = true;
      room.overtakeEvents.unshift({
        id: `pwr_${Date.now()}`,
        timestamp: Date.now(),
        text: `⚡ ${player.name} activated 2× AURA SURGE!`,
        type: 'power',
      });
    } else if (payload.powerCardType === 'SHIELD') {
      player.shieldActive = true;
      room.overtakeEvents.unshift({
        id: `pwr_${Date.now()}`,
        timestamp: Date.now(),
        text: `🛡️ ${player.name} deployed AURA SHIELD!`,
        type: 'power',
      });
    } else if (payload.powerCardType === 'DRAIN') {
      const topLeader = Object.values(room.players).sort((a, b) => b.score - a.score)[0];
      if (topLeader && topLeader.id !== player.id) {
        if (!topLeader.shieldActive) {
          const drainAmount = Math.max(100, Math.round(topLeader.score * 0.1));
          topLeader.score = Math.max(0, topLeader.score - drainAmount);
          player.score += drainAmount;
          room.overtakeEvents.unshift({
            id: `pwr_${Date.now()}`,
            timestamp: Date.now(),
            text: `🧲 ${player.name} drained ${drainAmount} Aura from ${topLeader.name}!`,
            type: 'steal',
          });
        } else {
          topLeader.shieldActive = false; // Shield absorbs drain
          room.overtakeEvents.unshift({
            id: `pwr_${Date.now()}`,
            timestamp: Date.now(),
            text: `🛡️ ${topLeader.name}'s Shield blocked ${player.name}'s Drain!`,
            type: 'power',
          });
        }
      }
    }
    broadcastRoomUpdate(upperCode);
    return { success: true, message: `Activated ${card.name}!` };
  }

  // 2. SUBMIT ANSWER TO CURRENT CHALLENGE
  if (payload.type === 'SUBMIT_ANSWER') {
    if (room.phase !== 'CHALLENGE_ACTIVE' || !room.activeChallenge) {
      return { success: false, error: 'Challenge is not currently active' };
    }

    if (room.roundSubmissions[payload.playerId]) {
      return { success: false, error: 'Already answered this round' };
    }

    const challenge = room.activeChallenge;
    const now = Date.now();
    const elapsedMs = room.roundStartTime ? now - room.roundStartTime : 1000;
    const isLate = elapsedMs > room.roundDurationMs;

    let isCorrect = false;
    let feedbackMsg = '';

    if (challenge.type === 'reflex') {
      isCorrect = !isLate;
      feedbackMsg = isCorrect ? '⚡ LIGHTNING REFLEX!' : 'TOO SLOW!';
    } else if (challenge.options && payload.optionIndex !== undefined) {
      const selectedOption = challenge.options[payload.optionIndex];
      isCorrect = !!selectedOption?.correct;
      feedbackMsg = selectedOption?.feedback || (isCorrect ? 'CORRECT!' : 'WRONG CHOICE!');
    }

    let pointsAwarded = 0;
    if (isCorrect && !isLate) {
      // Speed bonus: +150 to +0
      const speedFraction = Math.max(0, 1 - elapsedMs / room.roundDurationMs);
      const speedBonus = Math.round(speedFraction * 150);
      pointsAwarded = (challenge.baseAura || 250) + speedBonus;

      // 2x Surge Multiplier
      if (player.surgeActive) {
        pointsAwarded *= 2;
        player.surgeActive = false;
      }

      // Streak Multiplier
      player.streak += 1;
      if (player.streak >= 3) {
        pointsAwarded += player.streak * 40;
      }

      const previousLeader = Object.values(room.players).sort((a, b) => b.score - a.score)[0];
      player.score += pointsAwarded;

      // Check Overtake Announcement
      const newLeader = Object.values(room.players).sort((a, b) => b.score - a.score)[0];
      if (newLeader && previousLeader && newLeader.id !== previousLeader.id && newLeader.id === player.id) {
        room.overtakeEvents.unshift({
          id: `ovt_${Date.now()}`,
          timestamp: Date.now(),
          text: `⚡ ${player.name} TOOK THE LEAD!`,
          type: 'overtake',
        });
      }

      // Aura Steal Round Mechanic
      if (challenge.isStealRound) {
        const sorted = Object.values(room.players).sort((a, b) => b.score - a.score);
        const topLeader = sorted[0];
        if (topLeader && topLeader.id !== player.id) {
          if (!topLeader.shieldActive) {
            const stealAmount = 400;
            topLeader.score = Math.max(0, topLeader.score - stealAmount);
            player.score += stealAmount;
            room.overtakeEvents.unshift({
              id: `stl_${Date.now()}`,
              timestamp: Date.now(),
              text: `⚡ AURA STEAL! ${player.name} stole ${stealAmount} Aura from ${topLeader.name}!`,
              type: 'steal',
            });
          } else {
            topLeader.shieldActive = false;
            room.overtakeEvents.unshift({
              id: `stl_${Date.now()}`,
              timestamp: Date.now(),
              text: `🛡️ ${topLeader.name}'s SHIELD blocked the 400 Aura steal!`,
              type: 'power',
            });
          }
        }
      }
    } else {
      player.streak = 0;
      player.surgeActive = false;
      pointsAwarded = -50;
      player.score = Math.max(0, player.score + pointsAwarded);
    }

    player.lastAnswerFeedback = {
      correct: isCorrect,
      points: pointsAwarded,
      message: feedbackMsg,
    };

    room.roundSubmissions[payload.playerId] = {
      playerId: payload.playerId,
      optionIndex: payload.optionIndex,
      reactionTimeMs: elapsedMs,
      pointsAwarded,
      timestamp: now,
    };

    // If all connected players answered, advance early
    const totalPlayers = Object.keys(room.players).length;
    const answeredCount = Object.keys(room.roundSubmissions).length;
    if (answeredCount >= totalPlayers) {
      evaluateRoundEnd(upperCode, room.currentRoundIndex);
    } else {
      broadcastRoomUpdate(upperCode);
    }

    return { success: true, message: feedbackMsg };
  }

  return { success: true };
}

// -------------------------------------------------------------
// STALL ADMIN / EMERGENCY CONTROLS
// -------------------------------------------------------------
export function handleAdminCommand(code, command, hostToken = null) {
  const upperCode = code.toUpperCase();
  const room = globalRooms[upperCode];
  if (!room) return null;
  if (hostToken && room.hostToken && hostToken !== room.hostToken) {
    throw new Error('Unauthorized hostToken');
  }

  if (command === 'RESET') {
    room.phase = 'LOBBY';
    room.currentRoundIndex = 0;
    room.activeChallenge = null;
    room.roundSubmissions = {};
    Object.values(room.players).forEach((p) => {
      p.score = 0;
      p.streak = 0;
    });
  } else if (command === 'SKIP_PHASE') {
    evaluateRoundEnd(upperCode, room.currentRoundIndex);
  } else if (command === 'FORCE_WIN') {
    room.phase = 'PODIUM';
    room.activeChallenge = null;
    const top = Object.values(room.players)[0];
    if (top) top.score = 2500;
  }

  broadcastRoomUpdate(upperCode);
  return room;
}
