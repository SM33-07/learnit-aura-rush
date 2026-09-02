// app/api/room/[code]/action/route.js
import { NextResponse } from 'next/server';
import { handlePlayerAction } from '@/lib/room-manager';

export async function POST(req, { params }) {
  try {
    const { code } = await params;
    const body = await req.json();
    const playerId = body.playerId;

    if (!playerId || !body.type) {
      return NextResponse.json({ success: false, error: 'Missing playerId or action type' }, { status: 400 });
    }

    const result = handlePlayerAction(code, body);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
