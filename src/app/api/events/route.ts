import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { hostName, eventName, beverageType, tastingStyle } = await request.json();

    // Generate unique join code and host token
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const hostToken = crypto.randomBytes(32).toString('hex');

    const result = await query(
      `INSERT INTO events (name, beverage_type, tasting_style, join_code, host_name, host_token)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, join_code, host_token`,
      [eventName, beverageType, tastingStyle, joinCode, hostName, hostToken]
    );

    const event = result.rows[0];

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
