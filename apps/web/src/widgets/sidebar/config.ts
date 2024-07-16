import KeypairsIcon from '@heroicons/react/20/solid/CommandLineIcon';
import MapPinIcon from '@heroicons/react/20/solid/MapPinIcon';
import ListIcon from '@heroicons/react/20/solid/QueueListIcon';
import ScaleIcon from '@heroicons/react/20/solid/ScaleIcon';
import ServerStackIcon from '@heroicons/react/20/solid/ServerStackIcon';
import ShieldCheckIcon from '@heroicons/react/20/solid/ShieldCheckIcon';

export const NavbarLinks = [
  { to: `/`, name: 'Virtances', icon: ServerStackIcon },
  { to: `/images`, name: 'Images', icon: ListIcon },
  { to: `/keypairs`, name: 'Keypairs', icon: KeypairsIcon },
  { to: `/firewalls`, name: 'Firewalls', icon: ShieldCheckIcon },
  { to: `/floating-ips`, name: 'Floating IPs', icon: MapPinIcon },
  { to: `/loadbalancers`, name: 'Load Balancers', icon: ScaleIcon },
] as const;
