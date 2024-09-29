import {
  BrickWallIcon,
  FileKey2Icon,
  LandPlotIcon,
  Layers2Icon,
  LayoutGridIcon,
  LucideProps,
  SplitIcon,
} from 'lucide-react';

import { IS_LOADBALANCER_ENABLED } from '@/shared/constants';

type NavbarLink = {
  to: string;
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
};

export const NavbarLinks = [
  { to: `/`, name: 'Virtances', icon: LayoutGridIcon },
  { to: `/images`, name: 'Images', icon: Layers2Icon },
  { to: `/keypairs`, name: 'Keypairs', icon: FileKey2Icon },
  { to: `/firewalls`, name: 'Firewalls', icon: BrickWallIcon },
  { to: `/floating-ips`, name: 'Floating IPs', icon: LandPlotIcon },
  IS_LOADBALANCER_ENABLED && {
    to: `/loadbalancers`,
    name: 'Load Balancers',
    icon: SplitIcon,
  },
].filter(Boolean) as NavbarLink[];
