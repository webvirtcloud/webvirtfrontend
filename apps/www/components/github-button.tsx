import GithubIcon from '@/icons/github';

export function GithubButton() {
  return (
    <a
      className="group inline-flex h-12 items-center rounded-xl border border-neutral-300 px-8 outline-none transition-all duration-300 hover:scale-105 dark:border-white/50 dark:hover:border-white/80"
      href="https://github.com/retspen/webvirtmgr"
    >
      <GithubIcon className="mr-2" />
      <span>Github</span>
    </a>
  );
}
