import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../../../lib/db';

export async function GET(
  request: NextRequest,
  {params}: { params: Promise<{ id: string }> }
) {
  const {id} = await params;
  try {
    const result = await query(
      'SELECT * FROM items WHERE event_id = $1 ORDER BY created_at ASC',
      [id]
    );

    return NextResponse.json(result.rows);

  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}
