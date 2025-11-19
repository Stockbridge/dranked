import { NextRequest, NextResponse } from 'next/server';
import { insertItem } from '../../../../lib/db/items';

export async function POST(request: NextRequest) {
  try {
    const { eventId, name, producer, year, type, addedBy } = await request.json();

    const item = await insertItem({
      eventId,
      name,
      producer,
      year,
      type,
      addedBy
    });

    return NextResponse.json(item);

  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json(
      { error: 'Failed to add item' },
      { status: 500 }
    );
  }
}
