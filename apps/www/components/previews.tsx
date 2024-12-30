'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { cx } from 'ui/lib';

export function DesktopPreview({
  className,
  ...props
}: React.HTMLAttributes<HTMLImageElement>) {
  const { resolvedTheme } = useTheme();

  let src;

  switch (resolvedTheme) {
    case 'light':
      src = '/screen_white.png';
      break;
    case 'dark':
      src = '/screen_dark.png';
      break;
    default:
      src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      break;
  }

  return (
    <Image
      className={cx(['hidden rounded-xl border md:block', className])}
      src={src}
      width={1300}
      height={900}
      alt="main screen"
      {...props}
      priority
    />
  );
}

export function MobilePreview({
  className,
  ...props
}: React.HTMLAttributes<HTMLImageElement>) {
  const { resolvedTheme } = useTheme();

  let src;

  switch (resolvedTheme) {
    case 'light':
      src = '/screen_mobile_white.png';
      break;
    case 'dark':
      src = '/screen_mobile_dark.png';
      break;
    default:
      src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      break;
  }

  return (
    <Image
      className={cx(['rounded-xl border md:hidden', className])}
      src={src}
      width={1300}
      height={900}
      alt="main screen"
      {...props}
      priority
    />
  );
}
