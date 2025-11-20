import { NextRequest, NextResponse } from 'next/server';
import { addUserToEvent } from '../../../../../../lib/db/users';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name } = await request.json();

    const user = await addUserToEvent({
      eventId: id,
      name
    });

    return NextResponse.json(user);

  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json(
      { error: 'Failed to join event' },
      { status: 500 }
    );
  }
}
