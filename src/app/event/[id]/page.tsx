import { getEventById } from '../../../../lib/db/event';
import { notFound } from 'next/navigation';
import EventHome from './EventHome';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: PageProps) {
  const { id } = await params;

  const event = await getEventById(id);
  
  if (!event) {
    notFound();
  }

  return <EventHome event={event} />;
}
