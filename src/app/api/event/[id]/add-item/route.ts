import { NextRequest, NextResponse } from 'next/server';
import { addItemToEvent } from '../../../../../../lib/db/items';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, producer, year, type, addedByUserId, addedByName } = await request.json();

    const item = await addItemToEvent({
      eventId: id,
      name,
      producer,
      year,
      type,
      addedByUserId,
      addedByName
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
