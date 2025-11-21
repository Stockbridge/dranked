import { NextRequest, NextResponse } from 'next/server';
import { addItemToEvent } from '@/utils/db/items';
import { validate } from '@/utils/validation';
import { verifyUserInEvent } from '@/utils/auth';

import { ValidationError, AuthError } from '@/utils/errors';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    validate.uuid(id, 'eventId');

    const body = await request.json();

    const name = validate.string(body.name, 'name', 1, 255);
    const producer = validate.optionalString(body.producer, 'producer', 255);
    const year = validate.optionalNumber(body.year, 'year', 1800, 2100);
    const type = validate.optionalString(body.type, 'type', 100);
    const addedByUserId = validate.uuid(body.addedByUserId, 'addedByUserId');
    const addedByName = validate.string(body.addedByName, 'addedByName', 1, 100);

    await verifyUserInEvent(addedByUserId, id);

    const item = await addItemToEvent({
      event_id: id,
      name,
      producer,
      year,
      type,
      added_by_user_id: addedByUserId,
      added_by_name: addedByName
    });

    return NextResponse.json(item);

  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error('Error adding item:', error);
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}
