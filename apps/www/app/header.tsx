'use client';

import SparklesIcon from '@heroicons/react/24/solid/SparklesIcon';
import ArrowSmallRightIcon from '@heroicons/react/24/solid/ArrowSmallRightIcon';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GithubButton } from '@/components/github-button';
import { DockerButton } from '@/components/docker-button';

export function HomeHeader() {
  return (
    <header className="relative overflow-hidden p-4 py-24 text-center md:px-8">
      <motion.div
        initial={{ opacity: 0, translateY: -8 }}
        animate={{ opacity: 100, translateY: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-center text-xs backdrop-blur-xl dark:border-white/20 dark:bg-white/5 md:text-base"
      >
        <SparklesIcon className="h-5 w-5" />
        <span>Beta release is finally here!</span>
        <div className="h-5 w-px bg-black/20 dark:bg-white/20"></div>
        <Link
          className="inline-flex items-center gap-1 text-sky-500"
          href={'/blog/october-beta-release'}
        >
          <span>Read post</span>
          <ArrowSmallRightIcon className="h-4 w-4" />
        </Link>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 100, translateY: 0 }}
        transition={{ duration: 1 }}
        className="mx-auto mb-6 text-5xl font-bold leading-tight text-neutral-400 dark:text-neutral-500 md:text-7xl md:leading-none"
      >
        Take{' '}
        <span className="font-medium text-black dark:text-white">cloud providers</span> to{' '}
        <br /> the{' '}
        <span className="font-medium text-black dark:text-white">next level</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, translateY: 14 }}
        animate={{ opacity: 100, translateY: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mb-12 text-xl text-neutral-500"
      >
        Self-hosted cloud platform solution
      </motion.p>
      <motion.div
        initial={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 100, translateY: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
      >
        <DockerButton />
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
            className="absolute -top-12 left-1/2 -z-10 h-24 w-24 -translate-x-1/2 rounded-full bg-cyan-300 blur-[120px] lg:h-96 lg:w-96"
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
            className="absolute left-1/2 top-4 -z-10 h-24 w-24 -translate-x-1/2 rounded-full bg-yellow-500 blur-[100px] md:h-48 md:w-48 lg:h-96 lg:w-96"
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
            viewport={{ margin: '0px 0px -50% 0px' }}
            transition={{
              type: 'spring',
              stiffness: 50,
              damping: 20,
            }}
          >
            <Image
              className="hidden rounded-xl border border-neutral-700 md:dark:block"
              src="/screen_dark.png"
              width={1300}
              height={900}
              alt="main screen"
            ></Image>
            <Image
              className="hidden rounded-xl border border-neutral-300 md:block md:dark:hidden"
              src="/screen_white.png"
              width={1300}
              height={900}
              alt="main screen"
            ></Image>
            <Image
              className="hidden rounded-xl border border-neutral-700 dark:block md:hidden"
              src="/screen_mobile_dark.png"
              width={1300}
              height={900}
              alt="main screen"
            ></Image>
            <Image
              className="rounded-xl border border-neutral-300 dark:hidden md:hidden"
              src="/screen_mobile_white.png"
              width={1300}
              height={900}
              alt="main screen"
            ></Image>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
