import { getEventById } from '../../../../../lib/db/event';
import { notFound } from 'next/navigation';
import AddItemForm from './AddItemForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AddItemPage({ params }: PageProps) {
  const { id } = await params;

  const event = await getEventById(id);
  
  if (!event) {
    notFound();
  }

  return <AddItemForm event={event} />;
}
