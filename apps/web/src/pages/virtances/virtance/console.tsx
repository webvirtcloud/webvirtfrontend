import { useParams } from 'react-router-dom';

import { VirtanceConsole } from '@/entities/virtance';

export default function VirtanceConsolePage() {
  const { id } = useParams();
  return <VirtanceConsole id={id} />;
}
