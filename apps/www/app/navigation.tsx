import Link from 'next/link';
import XIcon from '@/icons/x';
import GithubIcon from '@/icons/github';
import { Logotype } from '@/components/logotype';

export function Navigation() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 backdrop-blur-xl dark:bg-black/10">
      <div className="container mx-auto  flex h-20 items-center justify-between px-4 md:px-8">
        <Logotype />
        <ul className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 md:gap-8">
          <li>
            <Link
              className="transition-colors hover:text-black dark:hover:text-white"
              href="/blog"
            >
              Blog
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-neutral-500">Docs</span>
            <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-[11px] font-medium dark:bg-neutral-800">
              soon
            </span>
          </li>
          <li
            role="separator"
            className="h-4 w-px bg-neutral-300 dark:bg-neutral-700"
          ></li>
          <li>
            <a
              className="transition-colors hover:text-black dark:hover:text-white"
              href="https://github.com/webvirtcloud"
              target="_blank"
            >
              <GithubIcon />
            </a>
          </li>
          <li>
            <a
              className="transition-colors hover:text-black dark:hover:text-white"
              href="https://x.com/webvirtcloud"
              target="_blank"
            >
              <XIcon />
            </a>
          </li>
        </ul>
      </div>
      <div className="absolute bottom-0 flex h-1 w-full flex-row items-center justify-center pt-4">
        <div className="h-[1px] w-1/2 bg-gradient-to-r from-transparent to-black/10 dark:to-white/20"></div>
        <div className="h-[1px] w-1/2 bg-gradient-to-l from-transparent to-black/10 dark:to-white/20"></div>
      </div>
    </nav>
  );
}
