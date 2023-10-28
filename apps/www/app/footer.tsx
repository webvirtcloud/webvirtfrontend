import { Logotype } from '@/components/logotype';
import { SOCIAL_LINKS } from './social-links';

export function Footer() {
  return (
    <footer className="relative border-neutral-200 py-20 dark:border-neutral-800">
      <div className="absolute top-0 flex h-1 w-full flex-row items-center justify-center pt-4">
        <div className="h-[1px] w-1/2 bg-gradient-to-r from-transparent to-black/10 dark:to-white/20"></div>
        <div className="h-[1px] w-1/2 bg-gradient-to-l from-transparent to-black/10 dark:to-white/20"></div>
      </div>

      <div className="container mx-auto space-y-4 px-4 md:px-8">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="space-y-4">
            <Logotype />

            <p className="text-sm text-neutral-500">
              © Copyright {new Date().getFullYear()} WebVirtCloud.
            </p>
          </div>
          <div>
            <ul className="flex items-center gap-8">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      className="transition-colors hover:text-black dark:hover:text-white"
                      href={link.href}
                      target="_blank"
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
