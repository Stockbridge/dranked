import { NextRequest, NextResponse } from 'next/server';
import { upsertRating } from '../../../../lib/db/ratings';

export async function POST(request: NextRequest) {
  try {
    const { eventId, itemId, userId, score } = await request.json();

    const rating = await upsertRating({
      eventId,
      itemId,
      userId,
      score
    });

    return NextResponse.json(rating);

  } catch (error) {
    console.error('Error saving rating:', error);
    return NextResponse.json(
      { error: 'Failed to save rating' },
      { status: 500 }
    );
  }
}
