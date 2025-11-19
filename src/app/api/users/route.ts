import { NextRequest, NextResponse } from 'next/server';
import { upsertUser } from '../../../../lib/db/users';

export async function POST(request: NextRequest) {
  try {
    const { eventId, name } = await request.json();

    const user = await upsertUser({
      eventId,
      name
    });

    return NextResponse.json(user);

  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json(
      { error: 'Failed to join event' },
      { status: 500 }
    );
  }
}
