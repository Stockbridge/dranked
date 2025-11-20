import { NextRequest, NextResponse } from 'next/server';
import { updateRating, getRatingsByEventAndUser } from '../../../../../../../utils/db/ratings';
import { validate, ValidationError } from '../../../../../../../utils/validation';
import { verifyUserInEvent, AuthError } from '../../../../../../../utils/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> }
) {
  try {
    const { id, userId } = await params;
    validate.uuid(id, 'eventId');
    validate.uuid(userId, 'userId');

    await verifyUserInEvent(userId, id);

    const ratings = await getRatingsByEventAndUser(id, userId);
    return NextResponse.json(ratings);

  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error('Error fetching ratings:', error);
    return NextResponse.json({ error: 'Failed to fetch ratings' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> }
) {
  try {
    const { id, userId } = await params;
    validate.uuid(id, 'eventId');
    validate.uuid(userId, 'userId');

    const body = await request.json();
    const itemId = validate.uuid(body.itemId, 'itemId');
    const score = validate.number(body.score, 'score', 1, 10);

    await verifyUserInEvent(userId, id);

    const rating = await updateRating({
      eventId: id,
      itemId,
      userId,
      score
    });

    return NextResponse.json(rating);

  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error('Error saving rating:', error);
    return NextResponse.json({ error: 'Failed to save rating' }, { status: 500 });
  }
}
