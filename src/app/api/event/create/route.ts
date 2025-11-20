import { NextRequest, NextResponse } from 'next/server';
import { createEvent } from '../../../../utils/db/event';

export async function POST(request: NextRequest) {
  try {
    const { hostName, eventName, beverageType, tastingStyle } = await request.json();

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
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
