import Image from 'next/image';
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
import GithubIcon from '@/icons/github';
import cx from 'clsx';
import { HomeHeader } from '@/app/header';
import { DockerButton } from '@/components/docker-button';

export default function Page() {
  const features = [
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
      description:
        'Descriptive tags for efficient resource categorization and management.',
    },
    {
      name: '7. Firewalls',
      icon: ShieldCheckIcon,
      coming: true,
      description: 'Security rules for network access control and threat prevention.',
    },
    {
      name: '8. Floating IPs',
      icon: MapPinIcon,
      coming: true,
      description: 'On-demand, portable IP addresses for flexible network architecture.',
    },
    {
      name: '9. One click apps',
      icon: CursorArrowRaysIcon,
      coming: true,
      description:
        'Rapid deployment of pre-configured applications for streamlined setup.',
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
  ];

  const profiles = [
    {
      picture: '/roman_s.jpg',
      fullname: 'Roman Slonov',
      github: 'https://github.com/romanslonov',
      position: 'Front-end Developer & Designer',
    },
    {
      picture: '/anatoliy_g.jpg',
      fullname: 'Anatoliy Guskov',
      github: 'https://github.com/retspen',
      position: 'System Engineer',
    },
  ];

  return (
    <>
      <HomeHeader />

      <main className="container mx-auto px-4 pb-32 md:px-8">
        <section id="features" className="relative mx-auto max-w-6xl py-32">
          <h2 className="mb-4 text-center text-5xl font-bold">Core features</h2>
          <p className="mb-16 text-center text-xl text-neutral-500">
            WebVirtCloud shipped with the most popular tools.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className={cx([
                  'rounded-xl bg-neutral-100 px-6 py-8 dark:bg-neutral-900 ',
                  feature.coming
                    ? ''
                    : 'transition-transform duration-500 hover:scale-105',
                ])}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700">
                  <feature.icon className=" h-6 w-6 text-neutral-700 dark:text-neutral-400" />
                </div>
                <div className="space-y-2">
                  <h3
                    className={cx([
                      'text-base',
                      feature.coming ? 'text-neutral-600 dark:text-neutral-400' : '',
                    ])}
                  >
                    {feature.name}
                    {feature.coming && (
                      <span className="ml-2 rounded-md bg-yellow-200/50 px-1.5 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-500">
                        coming soon
                      </span>
                    )}
                  </h3>
                  <p className="text-neutral-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="benefits" className="relative mx-auto max-w-6xl py-32">
          <h2 className="mb-4 text-center text-5xl font-bold">Benefits</h2>
          <p className="mb-16 text-center text-xl text-neutral-500">
            Our web interface offers several benefits that make it the ideal tool <br />{' '}
            for managing your virtual machines.
          </p>
          <div className="mb-4 grid gap-4 md:grid-cols-12">
            <div className="relative flex flex-col justify-end overflow-hidden rounded-xl bg-neutral-100 p-8 pt-16 transition-transform duration-300 hover:scale-[1.01] dark:bg-neutral-900 md:col-span-8">
              <div className="absolute -top-60 left-8 h-64 w-64 rounded-3xl bg-cyan-500 blur-[80px]"></div>
              <h3 className="relative z-10 mb-4 text-3xl font-semibold">Ease of use</h3>
              <p className="relative z-10 text-lg font-normal text-neutral-600 dark:text-white/80">
                Our interface is designed to be user-friendly and intuitive, making it
                easy for even non-technical users to manage their virtual machines.
              </p>
            </div>
            <div className="relative flex flex-col justify-end overflow-hidden rounded-xl bg-neutral-100 p-8 pt-16 transition-transform duration-300 hover:scale-[1.01] dark:bg-neutral-900 md:col-span-4">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-3xl bg-yellow-500 blur-[80px]"></div>
              <h3 className="relative z-10 mb-4 text-3xl font-semibold">Time-saving</h3>
              <p className="relative z-10 text-lg font-normal text-neutral-600 dark:text-white/80">
                With our interface, you can perform virtual machine management tasks
                quickly and easily, saving you time and effort.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-12">
            <div className="relative flex flex-col justify-end overflow-hidden rounded-xl bg-neutral-100 p-8 pt-16 transition-transform duration-300 hover:scale-[1.01] dark:bg-neutral-900 md:col-span-4">
              <div className="absolute -bottom-60 -left-20 h-64 w-64 rounded-3xl bg-emerald-500 blur-[80px]"></div>
              <h3 className="relative z-10 mb-4 text-3xl font-semibold">
                Increased efficiency
              </h3>
              <p className="relative z-10 text-lg font-normal text-neutral-600 dark:text-white/80">
                Our interface allows you to manage multiple virtual machines from a single
                interface, which increases your efficiency and productivity.
              </p>
            </div>
            <div className="relative flex flex-col justify-end overflow-hidden rounded-xl bg-neutral-100 p-8 pt-16 transition-transform duration-300 hover:scale-[1.01] dark:bg-neutral-900 md:col-span-8">
              <div className="absolute -bottom-56 left-8 h-64 w-64 rounded-3xl bg-pink-500 blur-[80px]"></div>
              <h3 className="relative z-10 mb-4 text-3xl font-semibold">Cost-saving</h3>
              <p className="relative z-10 text-lg font-normal text-neutral-600 dark:text-white/80">
                By managing your virtual machines more efficiently, you can save on
                resources and reduce your overall costs, because you use self-hosted
                solution
              </p>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="relative mx-auto max-w-6xl py-32">
          <h2 className="mb-8 text-5xl font-bold">How it works</h2>
          <p className="mb-16 max-w-5xl text-lg text-neutral-500 dark:text-neutral-400 md:text-xl md:leading-relaxed">
            To deploy and manage VMs on this cloud platform, you need to install a
            frontend, backend, and application on the hypervisor. The frontend is
            responsible for handling user requests, providing a user interface for
            managing VMs, and communicating with the backend. The backend manages the
            hypervisors and their associated VMs, and provides a REST API that can be used
            to interact with the platform programmatically. The application layer provides
            additional functionality such as billing, monitoring, and automation.
          </p>
          <div className="h-2 w-16 bg-neutral-700"></div>
        </section>
        <section id="who-we-are" className="relative py-32">
          <h2 className="mb-16 text-center text-5xl font-bold">Who we are</h2>
          <div className="flex flex-col justify-center gap-4 md:flex-row md:gap-8">
            {profiles.map((profile) => (
              <div
                key={profile.fullname}
                className="rounded-3xl bg-neutral-100 p-8 text-center transition-transform hover:scale-[1.02] dark:bg-neutral-900"
              >
                <Image
                  className="mx-auto mb-8 h-80 w-80 rounded-xl object-cover"
                  src={profile.picture}
                  width={800}
                  height={800}
                  alt="profile photo"
                />
                <div>
                  <h3 className="text-2xl">{profile.fullname}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {profile.position}
                  </p>
                  <a
                    href={profile.github}
                    target="_blank"
                    className="mt-4 inline-block text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  >
                    <span className="sr-only">GitHub profile</span>
                    <GithubIcon />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section
          id="get-started"
          className="relative my-32 flex flex-col overflow-hidden rounded-3xl bg-neutral-100 pb-0 pt-16 dark:bg-neutral-900 md:flex-row md:items-center md:gap-32 md:py-32"
        >
          <div className="shrink-0 p-4 md:w-1/2 md:p-0 md:pl-16">
            <h2 className="mb-8 text-3xl font-semibold md:text-5xl">Get started</h2>
            <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400 md:text-xl md:leading-relaxed">
              To get started with our web interface, all you need is a server running a
              supported operating system and libvirt installed. You can then install our
              web interface and start managing your virtual machines right away. We
              provide detailed documentation to help you get started, and our support team
              is always available to assist you if you have any questions or issues.
            </p>
            <DockerButton />
          </div>
          <Image
            className="hidden rounded-xl border border-neutral-700 dark:block"
            src="/screen_dark.png"
            width={1300}
            height={900}
            alt="main screen"
          ></Image>
          <Image
            className="rounded-xl border border-neutral-300 dark:hidden"
            src="/screen_white.png"
            width={1300}
            height={900}
            alt="main screen"
          ></Image>
        </section>
      </main>
    </>
  );
}
