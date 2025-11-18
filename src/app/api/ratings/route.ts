import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function POST(request: NextRequest) {
  try {
    const { eventId, itemId, userId, score } = await request.json();

    const result = await query(
      `INSERT INTO ratings (event_id, item_id, user_id, score)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (item_id, user_id) DO UPDATE SET score = $4, created_at = NOW()
       RETURNING *`,
      [eventId, itemId, userId, score]
    );

    return NextResponse.json(result.rows[0]);

  } catch (error) {
    console.error('Error saving rating:', error);
    return NextResponse.json(
      { error: 'Failed to save rating' },
      { status: 500 }
    );
  }
}
