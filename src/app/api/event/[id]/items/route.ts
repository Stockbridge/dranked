import { NextRequest, NextResponse } from 'next/server';
import { getItemsByEventId } from '../../../../../utils/db/items';

export interface AddItemAPIParams {
  params: Promise<{ id: string }>
}

export async function GET(
  request: NextRequest,
  { params }: AddItemAPIParams
) {
  try {
    const { id } = await params;
    const items = await getItemsByEventId(id);
    return NextResponse.json(items);

  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}