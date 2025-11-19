import { NextRequest, NextResponse } from 'next/server';
import { createEvent } from '../../../../../lib/db/event';

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
      joinUrl: `/join/${event.join_code}`,
      hostUrl: `/host/${event.id}?token=${event.host_token}`
    });

  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
