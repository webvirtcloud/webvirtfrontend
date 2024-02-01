import CommandLineIcon from '@heroicons/react/24/solid/CommandLineIcon';
import CircleStackIcon from '@heroicons/react/24/solid/CircleStackIcon';
import ShieldCheckIcon from '@heroicons/react/24/solid/ShieldCheckIcon';
import CubeTransparentIcon from '@heroicons/react/24/solid/CubeTransparentIcon';
import PlusCircleIcon from '@heroicons/react/24/solid/PlusCircleIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import CursorArrowRaysIcon from '@heroicons/react/24/solid/CursorArrowRaysIcon';
import CubeIcon from '@heroicons/react/24/solid/CubeIcon';
import Cog6ToothIcon from '@heroicons/react/24/solid/Cog6ToothIcon';
import Square2StackIcon from '@heroicons/react/24/solid/Square2StackIcon';
import Square3Stack3DIcon from '@heroicons/react/24/solid/Square3Stack3DIcon';

export const features: {
  name: string;
  description: string;
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >;
  coming?: boolean;
}[] = [
  {
    name: '1. Management VMs',
    description: 'Centralized control and monitoring for enhanced administration.',
    icon: PlusCircleIcon,
  },
  {
    name: '2. VMs resizing',
    icon: CubeTransparentIcon,
    description: 'Dynamic resource allocation for optimal performance.',
  },
  {
    name: '3. Console access',
    icon: CommandLineIcon,
    description: 'Secure remote interaction for system management.',
  },
  {
    name: '4. Private networking',
    icon: EyeSlashIcon,
    description: 'Isolated, secure data exchange within virtual environments.',
  },
  {
    name: '5. Backups & Snapshots',
    icon: CircleStackIcon,
    description: 'Data protection and recovery with instant snapshot capabilities.',
  },
  {
    name: '6. Metadata',
    icon: CubeIcon,
    description: 'Descriptive tags for efficient resource categorization and management.',
  },
  {
    name: '7. Firewalls',
    icon: ShieldCheckIcon,
    description: 'Security rules for network access control and threat prevention.',
  },
  {
    name: '8. Floating IPs',
    icon: MapPinIcon,
    description: 'On-demand, portable IP addresses for flexible network architecture.',
  },
  {
    name: '9. One click apps',
    icon: CursorArrowRaysIcon,
    coming: true,
    description: 'Rapid deployment of pre-configured applications for streamlined setup.',
  },
  {
    name: '10. Kubernetes',
    icon: Cog6ToothIcon,
    coming: true,
    description:
      'Container orchestration for scaling and managing containerized applications.',
  },
  {
    name: '11. Load balancer',
    icon: Square2StackIcon,
    coming: true,
    description:
      'Evenly distributes traffic for enhanced application availability and performance.',
  },
  {
    name: '12. Ansible',
    icon: Square3Stack3DIcon,
    coming: true,
    description:
      'Automation tool for efficient configuration management and orchestration.',
  },
] as const;
