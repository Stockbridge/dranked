import { getEventByJoinCode } from '../../../../lib/db/event';
import { notFound } from 'next/navigation';
import JoinForm from './JoinForm';

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function JoinPage({ params }: PageProps) {
  const { code } = await params;
  
  const event = await getEventByJoinCode(code.toUpperCase());
  
  if (!event) {
    notFound();
  }

  return <JoinForm event={event} />;
}
