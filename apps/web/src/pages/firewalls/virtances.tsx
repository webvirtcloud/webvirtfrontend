import { FirewallVirtances } from '@/widgets/firewall-virtances';
import { useParams } from 'react-router-dom';

export default function () {
  const { uuid } = useParams();

  return uuid ? <FirewallVirtances uuid={uuid} /> : null;
}
