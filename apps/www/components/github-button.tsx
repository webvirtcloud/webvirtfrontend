import GithubIcon from '@/icons/github';

export function GithubButton() {
  return (
    <a
      className="group inline-flex h-12 items-center rounded-xl border border-white/50 px-4 outline-none transition-all hover:border-white/80"
      href="https://github.com/retspen/webvirtmgr"
    >
      <GithubIcon className="mr-2" />
      <span>Github</span>
      <span className="mx-4 h-full w-px bg-white/50"></span>
      <span className="text-neutral-500 transition-colors group-hover:text-white">
        1.928
      </span>
    </a>
  );
}
