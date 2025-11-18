import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function POST(request: NextRequest) {
  try {
    const { eventId, name } = await request.json();

    const result = await query(
      `INSERT INTO users (event_id, name)
       VALUES ($1, $2)
       ON CONFLICT (event_id, name) DO UPDATE SET joined_at = NOW()
       RETURNING *`,
      [eventId, name]
    );

    return NextResponse.json(result.rows[0]);

  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json(
      { error: 'Failed to join event' },
      { status: 500 }
    );
  }
}
