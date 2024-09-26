import { LoadbalancerDelete } from './loadbalancer-delete';
import { LoadbalancerRules } from './loadbalancer-rules';

export function LoadbalancerSettings() {
  return (
    <div className="space-y-8">
      <LoadbalancerRules />
      <hr className="my-6" />
      <LoadbalancerDelete />
    </div>
  );
}
