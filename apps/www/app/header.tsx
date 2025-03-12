'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import GithubIcon from '@/icons/github';
import { cx } from 'ui/lib';
import { buttonVariants } from '@/components/button';
import { DesktopPreview } from '@/components/previews';
import { ReleaseBadge } from '@/components/release-badge';

export function HomeHeader() {
  return (
    <header className="container relative mx-auto p-4 py-24 text-center md:px-8">
      <ReleaseBadge>New feature: Load Balancer is released</ReleaseBadge>
      <motion.h1
        initial={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 100, translateY: 0 }}
        transition={{ duration: 1 }}
        className="mx-auto mb-6 text-5xl font-medium leading-tight tracking-[-0.0195em] md:text-7xl md:leading-none"
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
          className={cx(buttonVariants({ size: 'default', variant: 'default' }))}
          href="/docs/introduction"
        >
          Get started
        </Link>
        <a
          href="https://github.com/webvirtcloud/"
          target="_blank"
          className={cx(buttonVariants({ size: 'default', variant: 'outline' }))}
        >
          <GithubIcon className="mr-2" />
          Give a star
        </a>
      </motion.div>
      <p className="mb-8"></p>
      <div className="relative pt-8 md:pt-20">
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
        <div className="overflow-hidden max-md:relative max-md:inset-x-1/2 max-md:-mx-[50vw] max-md:w-screen max-md:pl-4">
          <motion.div
            initial={{ opacity: 0, translateY: 80 }}
            animate={{ opacity: 100, translateY: 0 }}
            transition={{ duration: 2 }}
            className="isolate mx-auto w-[900px] md:w-auto"
          >
            <DesktopPreview />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
