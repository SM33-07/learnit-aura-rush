// app/api/room/[code]/admin/route.js
import { NextResponse } from 'next/server';
import { handleAdminCommand } from '@/lib/room-manager';

export async function POST(req, { params }) {
  try {
    const { code } = await params;
    const body = await req.json();
    const { command, hostToken } = body;

    const updatedRoom = handleAdminCommand(code, command, hostToken);
    if (!updatedRoom) {
      return NextResponse.json({ success: false, error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, room: updatedRoom });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
