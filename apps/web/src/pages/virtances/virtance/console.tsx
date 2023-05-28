import { VirtanceConsole } from '@/entities/virtance';
import { useParams } from 'react-router-dom';

export default function () {
  const { id } = useParams();
  return <VirtanceConsole id={id} />;
}
