import { NextRequest, NextResponse } from 'next/server';
import { updateRating, getRatingsByEventAndUser } from '../../../../../../../../lib/db/ratings';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> }
) {
  try {
    const { id, userId } = await params;
    const ratings = await getRatingsByEventAndUser(id, userId);
    return NextResponse.json(ratings);

  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ratings' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> }
) {
  try {
    const { id, userId } = await params;
    const { itemId, score } = await request.json();

    const rating = await updateRating({
      eventId: id,
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
