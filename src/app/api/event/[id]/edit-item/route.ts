import { NextRequest, NextResponse } from 'next/server';
import { updateItem } from '../../../../../utils/db/items';

export async function PUT(request: NextRequest) {
  try {
    const { id, name, producer, year, type } = await request.json();

    const item = await updateItem({
      id,
      name,
      producer,
      year,
      type
    });

    return NextResponse.json(item);

  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    );
  }
}
