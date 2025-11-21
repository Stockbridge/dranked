import { getEventById } from '@/utils/db/event';
import { getItemsByEventId } from '@/utils/db/items';
import { notFound } from 'next/navigation';
import EventHome from './EventHome';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: PageProps) {
  const { id } = await params;

  const [event, items] = await Promise.allSettled([getEventById(id), getItemsByEventId(id)]);
  const eventResult = event.status !== 'rejected' ? event.value : null;
  const itemResult = items.status !== 'rejected' ? items.value : [];

  if (!eventResult) {
    notFound();
  }

  return <EventHome event={eventResult} items={itemResult} />;
}
