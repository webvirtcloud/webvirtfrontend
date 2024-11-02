import { useParams } from 'react-router-dom';

import { FirewallVirtances } from '@/widgets/firewall';

export default function FirewallVirtancesPage() {
  const { uuid } = useParams();

  return uuid ? <FirewallVirtances uuid={uuid} /> : null;
}
