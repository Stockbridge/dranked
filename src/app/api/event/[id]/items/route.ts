import { NextRequest, NextResponse } from 'next/server';
import { getItemsByEventId } from '../../../../../utils/db/items';
import { validate } from '../../../../../utils/validation';
import { ValidationError } from '../../../../../utils/errors';

export interface AddItemAPIParams {
  params: Promise<{ id: string }>
}

export async function GET(
  request: NextRequest,
  { params }: AddItemAPIParams
) {
  try {
    const { id } = await params;
    validate.uuid(id, 'eventId');

    const items = await getItemsByEventId(id);
    return NextResponse.json(items);

  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}