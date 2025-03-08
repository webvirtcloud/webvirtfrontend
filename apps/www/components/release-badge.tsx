import { ChevronRightIcon, SparklesIcon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export function ReleaseBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -8 }}
      animate={{ opacity: 100, translateY: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      <Link
        href={'/blog/new-feature-load-balancer'}
        className="bg-background/50 hover:bg-muted/50 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-center text-sm backdrop-blur-xl transition-colors"
      >
        <SparklesIcon className="h-4 w-4" />
        <span>{children}</span>
        <ChevronRightIcon className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}
