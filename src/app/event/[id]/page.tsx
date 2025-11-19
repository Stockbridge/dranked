import { getEventById } from '../../../../lib/db/event';
import { notFound } from 'next/navigation';
import EventHome from './EventHome';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function EventPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { token } = await searchParams;
  
  if (!token) {
    notFound();
  }

  const event = await getEventById(id, token);
  
  if (!event) {
    notFound();
  }

  return <EventHome event={event} />;
}
