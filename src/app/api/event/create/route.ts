import { NextRequest, NextResponse } from 'next/server';
import { createEvent } from '../../../../utils/db/event';
import { validate } from '../../../../utils/validation';
import { ValidationError } from '../../../../utils/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const hostName = validate.string(body.hostName, 'hostName', 1, 100);
    const eventName = validate.string(body.eventName, 'eventName', 1, 100);
    const beverageType = validate.enum(body.beverageType, 'beverageType', ['beer', 'wine', 'whiskey'] as const);
    const tastingStyle = validate.enum(body.tastingStyle, 'tastingStyle', ['open', 'blind'] as const);

    const event = await createEvent({
      hostName,
      eventName,
      beverageType,
      tastingStyle
    });

    return NextResponse.json({
      id: event.id,
      joinCode: event.join_code,
      hostToken: event.host_token,
      hostUser: event.host_user,
      joinUrl: `/join/${event.join_code}`,
      hostUrl: `/event/${event.id}?token=${event.host_token}`
    });

  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
