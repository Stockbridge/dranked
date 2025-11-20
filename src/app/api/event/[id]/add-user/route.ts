import { NextRequest, NextResponse } from 'next/server';
import { addUserToEvent } from '../../../../../utils/db/users';
import { validate, ValidationError } from '../../../../../utils/validation';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    validate.uuid(id, 'eventId');

    const body = await request.json();
    const name = validate.string(body.name, 'name', 1, 100);

    const user = await addUserToEvent({
      eventId: id,
      name
    });

    return NextResponse.json(user);

  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error adding user:', error);
    return NextResponse.json({ error: 'Failed to join event' }, { status: 500 });
  }
}
