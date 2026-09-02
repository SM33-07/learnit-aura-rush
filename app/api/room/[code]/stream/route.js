// app/api/room/[code]/stream/route.js
import { subscribeToRoom, getRoom } from '@/lib/room-manager';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  const { code } = await params;
  const { searchParams } = new URL(req.url);
  const playerId = searchParams.get('playerId');
  const hostToken = searchParams.get('hostToken');
  const sessionToken = searchParams.get('sessionToken');

  const upperCode = code.toUpperCase();
  const room = getRoom(upperCode);

  if (!room) {
    return new Response('Room not found', { status: 404 });
  }

  // Strict token validation
  if (playerId === 'host') {
    if (hostToken && room.hostToken && hostToken !== room.hostToken) {
      return new Response('Unauthorized host token', { status: 403 });
    }
  } else if (playerId) {
    const player = room.players[playerId];
    if (sessionToken && player?.sessionToken && sessionToken !== player.sessionToken) {
      return new Response('Unauthorized session token', { status: 403 });
    }
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const sendUpdate = (data) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {
          unsubscribe();
        }
      };

      const target = playerId || 'host';
      const unsubscribe = subscribeToRoom(upperCode, target, sendUpdate);

      req.signal.addEventListener('abort', () => {
        unsubscribe();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
