import { useParams } from 'react-router-dom';

import { FirewallRules } from '@/widgets/firewall';

export default function FirewallRulesPage() {
  const { uuid } = useParams();

  return uuid ? <FirewallRules uuid={uuid} /> : null;
}
