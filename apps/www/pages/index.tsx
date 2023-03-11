import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import { GithubButton } from '@/components/github-button';
import Link from 'next/link';
import InboxArrowDownIcon from '@heroicons/react/24/solid/InboxArrowDownIcon';
import GlobeAltIcon from '@heroicons/react/24/solid/GlobeAltIcon';
import CommandLineIcon from '@heroicons/react/24/solid/CommandLineIcon';
import CircleStackIcon from '@heroicons/react/24/solid/CircleStackIcon';
import AdjustmentsHorizontalIcon from '@heroicons/react/24/solid/AdjustmentsHorizontalIcon';
import BoltIcon from '@heroicons/react/24/solid/BoltIcon';
import PlusCircleIcon from '@heroicons/react/24/solid/PlusCircleIcon';
import GithubIcon from '@/icons/github';

const inter = Inter({ subsets: ['latin'] });

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
      name: '1. Creation & deletion',
      icon: PlusCircleIcon,
    },
    {
      name: '2. Configuration management',
      icon: AdjustmentsHorizontalIcon,
    },
    {
      name: '3. Live migration',
      icon: BoltIcon,
    },
    {
      name: '4. Snapshots',
      icon: CircleStackIcon,
    },
    {
      name: '5. Console access',
      icon: CommandLineIcon,
    },
    {
      name: '6. Network management',
      icon: GlobeAltIcon,
    },
    {
      name: '7. Storage management',
      icon: InboxArrowDownIcon,
    },
  ];

  return (
    <>
      <Head>
        <title>WebVirtCloud - Web interface to manage virtual machines</title>
        <meta
          name="description"
          content="WebVirtCloud - Take managing virtual machines to the next level"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <motion.nav
        initial={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="container mx-auto flex items-center justify-between p-8"
      >
        <Logotype />
        <ul className="flex items-center space-x-8 text-neutral-500">
          <li>
            <Link
              scroll={false}
              className="transition-colors hover:text-white"
              href="#features"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              scroll={false}
              className="transition-colors hover:text-white"
              href="#benefits"
            >
              Benefits
            </Link>
          </li>
          <li>
            <Link
              scroll={false}
              className="transition-colors hover:text-white"
              href="#how-it-works"
            >
              How it works
            </Link>
          </li>
          <li>
            <Link
              scroll={false}
              className="transition-colors hover:text-white"
              href="#who-we-are"
            >
              Who we are
            </Link>
          </li>
        </ul>
      </motion.nav>
      <header className="container mx-auto p-8 py-32 text-center">
        <motion.span
          initial={{ opacity: 0, translateY: -8 }}
          animate={{ opacity: 100, translateY: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-2 inline-block rounded-lg bg-white/20 px-3 py-1.5 text-center text-xs font-bold uppercase text-white"
        >
          Beta
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 100, translateY: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto mb-6 max-w-7xl text-6xl font-medium leading-snug text-neutral-500"
        >
          Take managing <span className="font-medium text-white">virtual machines</span>{' '}
          <br /> to the <span className="font-medium text-white">next level</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, translateY: 14 }}
          animate={{ opacity: 100, translateY: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-12 text-xl text-neutral-100"
        >
          Web interface for managing virtual machines.
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
            className="inline-flex h-12 items-center rounded-xl bg-gradient-to-l from-blue-600 to-cyan-500 px-8 font-semibold outline-none transition-transform duration-300 hover:scale-105"
          >
            Explore
          </Link>
          <GithubButton />
        </motion.div>
        <p className="mb-8"></p>
        <div className="relative pt-12">
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
      <main className="container mx-auto px-8 pb-32">
        <section id="features" className="relative mx-auto max-w-6xl py-32">
          <h2 className="mb-4 text-center text-5xl font-medium">Core features</h2>
          <p className="mb-16 text-center text-2xl text-neutral-500">
            WebVirtCloud shipped with the most popular tools.
          </p>
          {/* <div className="absolute left-1/2 top-40 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400 blur-[80px]"></div> */}
          <div className="grid grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="rounded-xl bg-neutral-900 px-6 py-12 text-center transition-transform duration-500 hover:scale-105"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-800">
                  <feature.icon className=" h-6 w-6 text-neutral-400" />
                </div>
                <h3 className="text-xl">{feature.name}</h3>
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
          <div className="mb-4 grid grid-cols-12 gap-4">
            <div className="relative col-span-8 flex flex-col justify-end overflow-hidden rounded-xl bg-neutral-900 p-8 pt-16 transition-transform duration-300 hover:scale-[1.01]">
              <div className="absolute -top-60 left-8 h-64 w-64 rounded-3xl bg-cyan-500 blur-[80px]"></div>
              <h3 className="relative z-10 mb-4 text-3xl font-semibold">Ease of use</h3>
              <p className="relative z-10 text-2xl font-normal text-white/80">
                Our interface is designed to be user-friendly and intuitive, making it
                easy for even non-technical users to manage their virtual machines.
              </p>
            </div>
            <div className="relative col-span-4 flex flex-col justify-end overflow-hidden rounded-xl bg-neutral-900 p-8 pt-16 transition-transform duration-300 hover:scale-[1.01]">
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-3xl bg-yellow-500 blur-[80px]"></div>
              <h3 className="relative z-10 mb-4 text-3xl font-semibold">Time-saving</h3>
              <p className="relative z-10 text-2xl font-normal text-white/80">
                With our interface, you can perform virtual machine management tasks
                quickly and easily, saving you time and effort.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="relative col-span-4 flex flex-col justify-end overflow-hidden rounded-xl bg-neutral-900 p-8 pt-16 transition-transform duration-300 hover:scale-[1.01]">
              <div className="absolute -bottom-60 -left-20 h-64 w-64 rounded-3xl bg-emerald-500 blur-[80px]"></div>
              <h3 className="relative z-10 mb-4 text-3xl font-semibold">
                Increased efficiency
              </h3>
              <p className="relative z-10 text-2xl font-normal text-white/80">
                Our interface allows you to manage multiple virtual machines from a single
                interface, which increases your efficiency and productivity.
              </p>
            </div>
            <div className="relative col-span-8 flex flex-col justify-end overflow-hidden rounded-xl bg-neutral-900 p-8 pt-16 transition-transform duration-300 hover:scale-[1.01]">
              <div className="absolute -bottom-56 left-8 h-64 w-64 rounded-3xl bg-pink-500 blur-[80px]"></div>
              <h3 className="relative z-10 mb-4 text-3xl font-semibold">Cost-saving</h3>
              <p className="relative z-10 text-2xl font-normal text-white/80">
                By managing your virtual machines more efficiently, you can save on
                resources and reduce your overall costs.
              </p>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="relative mx-auto max-w-6xl py-32">
          <h2 className="mb-8 text-5xl font-semibold">How it works</h2>
          <p className="mb-16 max-w-5xl text-3xl leading-relaxed text-neutral-500">
            Our libvirt-based web interface is built on top of libvirt, which is a widely
            used open-source API for managing virtualization technologies. Our interface
            communicates with libvirt to perform virtual machine management tasks. The
            interface is accessed through a web browser, making it easy to use from
            anywhere with an internet connection.
          </p>
          <div className="h-2 w-16 bg-neutral-700"></div>
        </section>
        <section id="who-we-are" className="relative py-32">
          <h2 className="mb-16 text-center text-5xl font-semibold">Who we are</h2>
          <div className="flex justify-center gap-8">
            <div className="rounded-3xl bg-neutral-900 p-8 text-center transition-transform hover:scale-[1.02]">
              <Image
                className="mb-8 h-80 w-80 rounded-3xl object-cover"
                src="/roman_s.jpg"
                width={800}
                height={800}
                alt="profile photo"
              />
              <div>
                <h3 className="text-2xl">Roman Slonov</h3>
                <p className="text-neutral-500">Front-end Developer</p>
                <a
                  href="https://github.com/romanslonov"
                  target="_blank"
                  className="mt-4 inline-block text-neutral-500 transition-colors hover:text-white"
                >
                  <GithubIcon />
                </a>
              </div>
            </div>
            <div className="rounded-3xl bg-neutral-900 p-8 text-center transition-transform hover:scale-[1.02]">
              <Image
                className="mb-8 h-80 w-80 rounded-3xl object-cover"
                src="/anatoliy_g.jpg"
                width={800}
                height={800}
                alt="profile photo"
              />
              <div>
                <h3 className="text-2xl">Anatoly Guskov</h3>
                <p className="text-neutral-500">System Engineer</p>
                <a
                  href="https://github.com/retspen"
                  target="_blank"
                  className="mt-4 inline-block text-neutral-500 transition-colors hover:text-white"
                >
                  <GithubIcon />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section
          id="who-we-are"
          className="relative my-32 flex items-center gap-32 overflow-hidden rounded-3xl bg-neutral-900 py-32"
        >
          <div className="w-1/2 shrink-0 pl-16">
            <h2 className="mb-8 text-5xl font-semibold">Get started</h2>
            <p className="mb-8 text-2xl leading-relaxed text-neutral-500">
              To get started with our web interface, all you need is a server running a
              supported operating system and libvirt installed. You can then install our
              web interface and start managing your virtual machines right away. We
              provide detailed documentation to help you get started, and our support team
              is always available to assist you if you have any questions or issues.
            </p>
            <Link
              href="/"
              className="inline-flex h-12 items-center rounded-xl bg-gradient-to-l from-yellow-600 to-orange-600 px-8 font-semibold outline-none transition-transform duration-300 hover:scale-105"
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
      <footer className="border-t border-neutral-800 py-8">
        <div className="container mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <Logotype />
            <GithubButton />
          </div>
          <p className="text-center text-neutral-500">
            WebVirtCloud {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}
