import { LoadbalancerDelete } from './loadbalancer-delete';
import { LoadbalancerHealthCheck } from './loadbalancer-health-check';
import { LoadbalancerRules } from './loadbalancer-rules';
import { LoadbalancerStickySessions } from './loadbalancer-sticky-sessions';

export function LoadbalancerSettings() {
  return (
    <div className="space-y-8">
      <LoadbalancerRules />
      <hr className="my-6" />
      <LoadbalancerHealthCheck />
      <hr className="my-6" />
      <LoadbalancerStickySessions />
      <hr className="my-6" />
      <LoadbalancerDelete />
    </div>
  );
}
