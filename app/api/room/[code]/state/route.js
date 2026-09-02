// app/api/room/[code]/state/route.js
import { NextResponse } from 'next/server';
import { getRoom, getPlayerProjection } from '@/lib/room-manager';

export async function GET(req, { params }) {
  try {
    const { code } = await params;
    const { searchParams } = new URL(req.url);
    const playerId = searchParams.get('playerId');
    const hostToken = searchParams.get('hostToken');
    const sessionToken = searchParams.get('sessionToken');

    const room = getRoom(code);
    if (!room) {
      return NextResponse.json({ success: false, error: 'Room not found' }, { status: 404 });
    }

    if (playerId === 'host') {
      if (hostToken && room.hostToken && hostToken !== room.hostToken) {
        return NextResponse.json({ success: false, error: 'Unauthorized host token' }, { status: 403 });
      }
      return NextResponse.json({ success: true, room });
    }

    if (playerId) {
      const player = room.players[playerId];
      if (!player) {
        return NextResponse.json({ success: false, error: 'Player not found in room' }, { status: 404 });
      }
      if (sessionToken && player.sessionToken && sessionToken !== player.sessionToken) {
        return NextResponse.json({ success: false, error: 'Unauthorized session token' }, { status: 403 });
      }

      const view = getPlayerProjection(room, playerId);
      return NextResponse.json({ success: true, view });
    }

    return NextResponse.json({ success: false, error: 'Missing playerId query parameter' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
