import { getEventById } from '../../../../../lib/db/event';
import { notFound } from 'next/navigation';
import EditItemForm from './EditItemForm';
import { query } from '../../../../../lib/db';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string; itemId?: string }>;
}

export default async function EditItemPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { token, itemId } = await searchParams;
  
  if (!token || !itemId) {
    notFound();
  }

  const event = await getEventById(id, token);
  
  if (!event) {
    notFound();
  }

  // Fetch the item
  const result = await query('SELECT * FROM items WHERE id = $1 AND event_id = $2', [itemId, id]);
  const item = result.rows[0];

  if (!item) {
    notFound();
  }

  return <EditItemForm event={event} item={item} />;
}
