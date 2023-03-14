import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GithubButton } from '@/components/github-button';
import Link from 'next/link';
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

function Logotype() {
  return (
    <Link href="/" className="flex items-center space-x-4">
      <Image
        width={48}
        height={48}
        className="h-12 w-12"
        src="logo.svg"
        alt="WebVirtCloud logotype"
      />
      <span className="text-lg font-medium">WebVirtCloud</span>
    </Link>
  );
}

export default function Home() {
  const features = [
    {
      name: '1. Management VMs',
      icon: PlusCircleIcon,
    },
    {
      name: '2. VMs resizing',
      icon: CubeTransparentIcon,
    },
    {
      name: '3. Console access',
      icon: CommandLineIcon,
    },
    {
      name: '4. Private networking',
      icon: EyeSlashIcon,
    },
    {
      name: '5. Backups & Snapshots',
      icon: CircleStackIcon,
    },
    {
      name: '6. Metadata',
      icon: CubeIcon,
    },
    {
      name: '7. Firewalls',
      icon: ShieldCheckIcon,
      coming: true,
    },
    {
      name: '8. Floating IPs',
      icon: MapPinIcon,
      coming: true,
    },
    {
      name: '9. One click apps',
      icon: CursorArrowRaysIcon,
      coming: true,
    },
    {
      name: '10. Kubernetes',
      icon: Cog6ToothIcon,
      coming: true,
    },
    {
      name: '11. Load balancer',
      icon: Square2StackIcon,
      coming: true,
    },
    {
      name: '12. Ansible',
      icon: Square3Stack3DIcon,
      coming: true,
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
      <Head>
        <title>WebVirtCloud - Take cloud providers to the next level</title>
        <meta name="description" content="Self-hosted cloud platform solution" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <motion.nav
        initial={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="container mx-auto flex items-center justify-between p-4 md:p-8"
      >
        <Logotype />
        <ul className="hidden items-center space-x-8 text-neutral-600 dark:text-neutral-400 md:flex">
          <li>
            <Link
              scroll={false}
              className="transition-colors hover:text-black dark:hover:text-white"
              href="#features"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              scroll={false}
              className="transition-colors hover:text-black dark:hover:text-white"
              href="#benefits"
            >
              Benefits
            </Link>
          </li>
          <li>
            <Link
              scroll={false}
              className="transition-colors hover:text-black dark:hover:text-white"
              href="#how-it-works"
            >
              How it works
            </Link>
          </li>
          <li>
            <Link
              scroll={false}
              className="transition-colors hover:text-black dark:hover:text-white"
              href="#who-we-are"
            >
              Who we are
            </Link>
          </li>
        </ul>
      </motion.nav>
      <header className="container mx-auto p-4 py-32 text-center md:p-8">
        <motion.span
          initial={{ opacity: 0, translateY: -8 }}
          animate={{ opacity: 100, translateY: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-2 inline-block rounded-lg bg-black/10 px-3 py-1.5 text-center text-xs font-bold uppercase dark:bg-white/20 dark:text-white"
        >
          Beta
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 100, translateY: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto mb-6 text-4xl font-medium text-neutral-500 dark:text-neutral-400 md:text-6xl md:leading-snug"
        >
          Take{' '}
          <span className="font-medium text-black dark:text-white">cloud providers</span>{' '}
          to <br /> the{' '}
          <span className="font-medium text-black dark:text-white">next level</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, translateY: 14 }}
          animate={{ opacity: 100, translateY: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-12 text-xl dark:text-neutral-100"
        >
          Self-hosted cloud platform solution
        </motion.p>
        <motion.div
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 100, translateY: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex items-center justify-center space-x-4"
        >
          <Link
            scroll={false}
            href="#features"
            className="inline-flex h-12 items-center rounded-xl bg-gradient-to-l from-blue-600 to-cyan-500 px-8 font-semibold text-white outline-none transition-transform duration-300 hover:scale-105 dark:text-black"
          >
            Explore
          </Link>
          <GithubButton />
        </motion.div>
        <p className="mb-8"></p>
        <div className="relative pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 1.2 }}
          >
            <motion.div
              variants={{
                pulse: {
                  translateX: ['-5%', '25%', '-45%', '30%'],
                  transition: {
                    duration: '12',
                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                },
              }}
              animate="pulse"
              className="absolute left-1/3 -top-12 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-300 blur-[120px]"
            ></motion.div>
            <motion.div
              variants={{
                pulse: {
                  translateX: ['10%', '-25%', '45%', '-30%'],
                  transition: {
                    duration: '12',
                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                },
              }}
              animate="pulse"
              className="absolute left-1/4 top-4 -z-10 h-96 w-96 -translate-x-1/3 rounded-full bg-yellow-500 blur-[100px]"
            ></motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateY: 80 }}
            animate={{ opacity: 100, translateY: 0 }}
            transition={{ duration: 2 }}
            style={{ perspective: '1000px' }}
            className="flex justify-center"
          >
            <motion.div
              initial={{ rotateX: '30deg', scale: 1.1 }}
              whileInView={{ rotateX: 0 }}
              viewport={{ margin: '0px 0px -40% 0px' }}
              transition={{
                type: 'spring',
                stiffness: 50,
                damping: 20,
              }}
            >
              <Image
                className="rounded-xl border border-neutral-700"
                src="/main.png"
                width={1300}
                height={900}
                alt="main screen"
              ></Image>
            </motion.div>
          </motion.div>
        </div>
      </header>
      <main className="container mx-auto px-4 pb-32 md:px-8">
        <section id="features" className="relative mx-auto max-w-6xl py-32">
          <h2 className="mb-4 text-center text-5xl font-medium">Core features</h2>
          <p className="mb-16 text-center text-2xl text-neutral-500">
            WebVirtCloud shipped with the most popular tools.
          </p>
          {/* <div className="absolute left-1/2 top-40 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400 blur-[80px]"></div> */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            {features.map((feature) => (
              <div
                key={feature.name}
                className={cx([
                  'rounded-xl bg-neutral-200 px-6 py-12 text-center dark:bg-neutral-800',
                  feature.coming
                    ? ''
                    : 'transition-transform duration-500 hover:scale-105',
                ])}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-300 dark:bg-neutral-700">
                  <feature.icon className=" h-6 w-6 text-neutral-700 dark:text-neutral-400" />
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <h3
                    className={cx([
                      'text-xl',
                      feature.coming ? 'text-neutral-600 dark:text-neutral-400' : '',
                    ])}
                  >
                    {feature.name}
                  </h3>
                  {feature.coming && (
                    <span className="rounded-3xl bg-yellow-200/50 py-1.5 px-2 text-xs font-medium text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-500">
                      coming soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="benefits" className="relative mx-auto max-w-6xl py-32">
          <h2 className="mb-4 text-center text-5xl font-semibold">Benefits</h2>
          <p className="mb-16 text-center text-2xl text-neutral-500">
            Our web interface offers several benefits that make it the ideal tool <br />{' '}
            for managing your virtual machines.
          </p>
          <div className="mb-4 grid gap-4 md:grid-cols-12">
            <div className="relative flex flex-col justify-end overflow-hidden rounded-xl bg-neutral-200 p-8 pt-16 transition-transform duration-300 hover:scale-[1.01] dark:bg-neutral-800 md:col-span-8">
              <div className="absolute -top-60 left-8 h-64 w-64 rounded-3xl bg-cyan-500 blur-[80px]"></div>
              <h3 className="relative z-10 mb-4 text-3xl font-semibold">Ease of use</h3>
              <p className="relative z-10 text-2xl font-normal text-neutral-600 dark:text-white/80">
                Our interface is designed to be user-friendly and intuitive, making it
                easy for even non-technical users to manage their virtual machines.
              </p>
            </div>
            <div className="relative flex flex-col justify-end overflow-hidden rounded-xl bg-neutral-200 p-8 pt-16 transition-transform duration-300 hover:scale-[1.01] dark:bg-neutral-800 md:col-span-4">
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-3xl bg-yellow-500 blur-[80px]"></div>
              <h3 className="relative z-10 mb-4 text-3xl font-semibold">Time-saving</h3>
              <p className="relative z-10 text-2xl font-normal text-neutral-600 dark:text-white/80">
                With our interface, you can perform virtual machine management tasks
                quickly and easily, saving you time and effort.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-12">
            <div className="relative flex flex-col justify-end overflow-hidden rounded-xl bg-neutral-200 p-8 pt-16 transition-transform duration-300 hover:scale-[1.01] dark:bg-neutral-800 md:col-span-4">
              <div className="absolute -bottom-60 -left-20 h-64 w-64 rounded-3xl bg-emerald-500 blur-[80px]"></div>
              <h3 className="relative z-10 mb-4 text-3xl font-semibold">
                Increased efficiency
              </h3>
              <p className="relative z-10 text-2xl font-normal text-neutral-600 dark:text-white/80">
                Our interface allows you to manage multiple virtual machines from a single
                interface, which increases your efficiency and productivity.
              </p>
            </div>
            <div className="relative flex flex-col justify-end overflow-hidden rounded-xl bg-neutral-200 p-8 pt-16 transition-transform duration-300 hover:scale-[1.01] dark:bg-neutral-800 md:col-span-8">
              <div className="absolute -bottom-56 left-8 h-64 w-64 rounded-3xl bg-pink-500 blur-[80px]"></div>
              <h3 className="relative z-10 mb-4 text-3xl font-semibold">Cost-saving</h3>
              <p className="relative z-10 text-2xl font-normal text-neutral-600 dark:text-white/80">
                By managing your virtual machines more efficiently, you can save on
                resources and reduce your overall costs, because you use self-hosted
                solution
              </p>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="relative mx-auto max-w-6xl py-32">
          <h2 className="mb-8 text-5xl font-semibold">How it works</h2>
          <p className="mb-16 max-w-5xl text-lg text-neutral-500 dark:text-neutral-400 md:text-3xl md:leading-relaxed">
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
          <h2 className="mb-16 text-center text-5xl font-semibold">Who we are</h2>
          <div className="flex flex-col justify-center gap-4 md:flex-row md:gap-8">
            {profiles.map((profile) => (
              <div
                key={profile.fullname}
                className="rounded-3xl bg-neutral-200 p-8 text-center transition-transform hover:scale-[1.02] dark:bg-neutral-800"
              >
                <Image
                  className="mx-auto mb-8 h-80 w-80 rounded-3xl object-cover"
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
          className="relative my-32 flex flex-col overflow-hidden rounded-3xl bg-neutral-200 pt-16 pb-0 dark:bg-neutral-800 md:flex-row md:items-center md:gap-32 md:py-32"
        >
          <div className="shrink-0 p-4 md:w-1/2 md:p-0 md:pl-16">
            <h2 className="mb-8 text-3xl font-semibold md:text-5xl">Get started</h2>
            <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400 md:text-2xl md:leading-relaxed">
              To get started with our web interface, all you need is a server running a
              supported operating system and libvirt installed. You can then install our
              web interface and start managing your virtual machines right away. We
              provide detailed documentation to help you get started, and our support team
              is always available to assist you if you have any questions or issues.
            </p>
            <Link
              href="/"
              className="inline-flex h-12 items-center rounded-xl bg-gradient-to-l from-yellow-600 to-orange-600 px-8 font-semibold text-white outline-none transition-transform duration-300 hover:scale-105 dark:text-black"
            >
              Get started now
            </Link>
          </div>
          <Image
            className="rounded-xl border border-neutral-700"
            src="/main.png"
            width={1300}
            height={900}
            alt="main screen"
          ></Image>
        </section>
      </main>
      <footer className="border-t border-neutral-200 py-8 dark:border-neutral-800">
        <div className="container mx-auto space-y-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-0">
            <Logotype />
            <p className="text-center text-neutral-500">
              WebVirtCloud {new Date().getFullYear()}
            </p>
            <GithubButton />
          </div>
        </div>
      </footer>
    </>
  );
}
