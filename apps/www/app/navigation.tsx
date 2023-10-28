import { Logotype } from '@/components/logotype';
import { SOCIAL_LINKS } from './social-links';
import { NavigationItem } from './navigation-item';

export function Navigation() {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 bg-white/50 backdrop-blur-md dark:bg-black/10">
      <div className="max-w-8xl mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <Logotype />
        <ul className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 md:gap-8">
          <NavigationItem href="/blog">Blog</NavigationItem>
          <NavigationItem href="/docs">Docs</NavigationItem>
          <li role="separator" className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
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
      <div className="absolute bottom-0 flex h-1 w-full flex-row items-center justify-center pt-4">
        <div className="h-[1px] w-1/2 bg-gradient-to-r from-transparent to-black/10 dark:to-white/20"></div>
        <div className="h-[1px] w-1/2 bg-gradient-to-l from-transparent to-black/10 dark:to-white/20"></div>
      </div>
    </nav>
  );
}
