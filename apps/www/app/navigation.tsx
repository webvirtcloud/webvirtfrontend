'use client';

import Link from 'next/link';
import MenuIcon from '@heroicons/react/20/solid/Bars3BottomLeftIcon';
import { Logotype } from '@/components/logotype';
import { SOCIAL_LINKS } from './social-links';
import { NavigationItem } from './navigation-item';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'ui/components/dropdown-menu';

const NavLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Docs', href: '/docs' },
] as const;

export function Navigation() {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 bg-white/50 backdrop-blur-md dark:bg-black/10">
      <div className="max-w-8xl mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <Logotype />
        <ul className="text-muted-foreground hidden items-center gap-3 md:flex md:gap-6">
          {NavLinks.map((link) => (
            <NavigationItem key={link.name} href={link.href}>
              {link.name}
            </NavigationItem>
          ))}
          <li role="separator" className="bg-border h-4 w-px" />
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.name}>
                <a
                  className="hover:text-foreground transition-colors"
                  href={link.href}
                  target="_blank"
                >
                  <span className="sr-only">{link.name}</span>
                  <Icon />
                </a>
              </li>
            );
          })}
        </ul>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-8 w-8 items-center justify-center">
                <MenuIcon className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-[12rem] dark:bg-neutral-900"
            >
              {NavLinks.map((link) => (
                <DropdownMenuItem className="cursor-pointer" key={link.name} asChild>
                  <Link href={link.href}>{link.name}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <DropdownMenuItem key={link.name}>
                    <a
                      className="flex w-full items-center gap-3"
                      href={link.href}
                      target="_blank"
                    >
                      <Icon />
                      <span className="capitalize">{link.name}</span>
                    </a>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="absolute bottom-0 flex h-1 w-full flex-row items-center justify-center pt-4">
        <div className="h-[1px] w-1/2 bg-gradient-to-r from-transparent to-black/10 dark:to-white/20"></div>
        <div className="h-[1px] w-1/2 bg-gradient-to-l from-transparent to-black/10 dark:to-white/20"></div>
      </div>
    </nav>
  );
}
