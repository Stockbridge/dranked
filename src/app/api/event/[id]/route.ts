import { NextRequest, NextResponse } from 'next/server';
import { getEventById } from '../../../../utils/db/event';
import { validate } from '../../../../utils/validation';
import { ValidationError } from '../../../../utils/errors';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    validate.uuid(id, 'eventId');

    const event = await getEventById(id);

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: event.id,
      name: event.name,
      beverageType: event.beverage_type,
      hostName: event.host_name,
      joinCode: event.join_code
    });

  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error fetching event:', error);
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}
