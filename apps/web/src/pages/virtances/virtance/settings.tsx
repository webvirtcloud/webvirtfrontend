import { VirtanceSettings as Settings } from '@/widgets/virtance-settings';

import { useParams } from 'react-router-dom';

export default function VirtanceSettings() {
  const { id } = useParams();

  return <Settings id={Number(id)} />;
}
