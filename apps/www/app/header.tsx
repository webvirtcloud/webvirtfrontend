'use client';

import SparklesIcon from '@heroicons/react/24/solid/SparklesIcon';
import ArrowSmallRightIcon from '@heroicons/react/24/solid/ArrowSmallRightIcon';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GithubIcon from '@/icons/github';
import { cx } from 'ui/lib';
import { buttonVariants } from '@/components/button';
import { DesktopPreview, MobilePreview } from '@/components/previews';

export function HomeHeader() {
  return (
    <header className="relative overflow-hidden p-4 py-24 text-center md:px-8">
      <motion.div
        initial={{ opacity: 0, translateY: -8 }}
        animate={{ opacity: 100, translateY: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="bg-muted/50 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-center text-xs backdrop-blur-xl md:text-base"
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
        className="mx-auto mb-6 text-5xl font-medium leading-tight md:text-7xl md:leading-none"
      >
        Free, open source <br /> cloud platform
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, translateY: 14 }}
        animate={{ opacity: 100, translateY: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-muted-foreground mx-auto mb-12 max-w-2xl text-balance text-center text-2xl"
      >
        Meet a modern and powerful all-in-one cloud management platform for your company &
        your clients
      </motion.p>
      <motion.div
        initial={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 100, translateY: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
      >
        <Link
          className={cx(buttonVariants({ size: 'xl', variant: 'default' }))}
          href="/docs/introduction"
        >
          Try it now
        </Link>
        <a
          href="https://github.com/webvirtcloud/"
          target="_blank"
          className={cx(buttonVariants({ size: 'xl', variant: 'outline' }))}
        >
          <GithubIcon className="mr-2" />
          Give a star
        </a>
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
            <DesktopPreview />
            <MobilePreview />
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
