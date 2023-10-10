import { useFirewall } from '@/entities/firewall';
import { FirewallRules } from '@/widgets/firewall-rules';
import { useParams } from 'react-router-dom';

export default function () {
  const { uuid } = useParams();

  return uuid && <FirewallRules uuid={uuid} />;
}
