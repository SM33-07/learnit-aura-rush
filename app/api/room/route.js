// app/api/room/route.js
import { NextResponse } from 'next/server';
import { getOrCreateRoom, joinPlayer, startGame, generateUniqueRoomCode, getPlayerProjection } from '@/lib/room-manager';

export async function POST(req) {
  try {
    const body = await req.json();
    const { action, code, playerId, name, hostToken } = body;

    const roomCode = (code && code.trim() ? code.trim() : generateUniqueRoomCode()).toUpperCase();

    if (action === 'CREATE') {
      const room = getOrCreateRoom(roomCode, playerId || 'host', hostToken);
      return NextResponse.json({
        success: true,
        room,
        code: roomCode,
        hostToken: room.hostToken,
      });
    }

    if (action === 'JOIN') {
      if (!name || !name.trim()) {
        return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
      }
      const { player, room } = joinPlayer(roomCode, playerId, name);
      const view = getPlayerProjection(room, player.id);

      return NextResponse.json({
        success: true,
        player,
        sessionToken: player.sessionToken,
        view,
      });
    }

    if (action === 'START') {
      startGame(roomCode, hostToken);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
