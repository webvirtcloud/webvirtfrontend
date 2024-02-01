import GithubIcon from '@/icons/github';

export function GithubButton() {
  return (
    <a
      className="group inline-flex h-12 items-center justify-center rounded-lg bg-neutral-950 px-8 font-medium text-white outline-none transition-all duration-300 hover:scale-[1.02] hover:border-neutral-800"
      href="https://github.com/webvirtcloud/"
    >
      <GithubIcon className="mr-2" />
      <span>Give a star</span>
    </a>
  );
}
