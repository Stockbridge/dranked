import { NextRequest, NextResponse } from 'next/server';
import { updateItem } from '../../../../../utils/db/items';
import { validate, ValidationError } from '../../../../../utils/validation';
import { verifyCanEditItem, AuthError } from '../../../../../utils/db/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: eventId } = await params;
    validate.uuid(eventId, 'eventId');

    const body = await request.json();

    const id = validate.uuid(body.id, 'itemId');
    const userId = validate.uuid(body.userId, 'userId');
    const name = validate.string(body.name, 'name', 1, 255);
    const producer = validate.optionalString(body.producer, 'producer', 255);
    const year = validate.optionalNumber(body.year, 'year', 1800, 2100);
    const type = validate.optionalString(body.type, 'type', 100);

    await verifyCanEditItem(userId, id, eventId);

    const item = await updateItem({
      id,
      name,
      producer,
      year,
      type
    });

    return NextResponse.json(item);

  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error('Error updating item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}
