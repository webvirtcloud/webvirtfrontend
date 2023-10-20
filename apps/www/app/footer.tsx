import { GithubButton } from '@/components/github-button';
import { Logotype } from '@/components/logotype';

export function Footer() {
  return (
    <footer className="relative border-neutral-200 py-8 dark:border-neutral-800">
      <div className="absolute top-0 flex h-1 w-full flex-row items-center justify-center pt-4">
        <div className="h-[1px] w-1/2 bg-gradient-to-r from-transparent to-black/10 dark:to-white/20"></div>
        <div className="h-[1px] w-1/2 bg-gradient-to-l from-transparent to-black/10 dark:to-white/20"></div>
      </div>
      <div className="container mx-auto space-y-4 px-4 md:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-0">
          <Logotype />
          <p className="text-center text-neutral-500">
            WebVirtCloud {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
