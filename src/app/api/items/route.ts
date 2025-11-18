import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function POST(request: NextRequest) {
  try {
    const { eventId, name, producer, year, type, addedBy } = await request.json();

    const result = await query(
      `INSERT INTO items (event_id, name, producer, year, type, added_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [eventId, name, producer, year, type, addedBy]
    );

    return NextResponse.json(result.rows[0]);

  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json(
      { error: 'Failed to add item' },
      { status: 500 }
    );
  }
}
