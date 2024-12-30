'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { cx } from 'ui/lib';
import { useEffect, useState } from 'react';

interface PreviewProps {
  className?: string;
}

export function DesktopPreview(props: PreviewProps) {
  const { className } = props;
  const src = useThemedImagePath({
    light: '/screen_white.png',
    dark: '/screen_dark.png',
  });

  if (!src) return null;

  return (
    <Image
      className={cx(['hidden rounded-xl border md:block', className])}
      src={src}
      width={1300}
      height={900}
      alt="main screen"
      priority
    />
  );
}

export function MobilePreview(props: PreviewProps) {
  const { className } = props;

  const src = useThemedImagePath({
    light: '/screen_mobile_white.png',
    dark: '/screen_mobile_dark.png',
  });

  if (!src) return null;

  return (
    <Image
      className={cx(['rounded-xl border md:hidden', className])}
      src={src}
      width={1300}
      height={900}
      alt="main screen"
      priority
    />
  );
}

function useThemedImagePath({ light, dark }: { light: string; dark: string }) {
  const { resolvedTheme } = useTheme();
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    switch (resolvedTheme) {
      case 'light':
        setSrc(light);
        break;
      case 'dark':
        setSrc(dark);
        break;
      default:
        setSrc(
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        );
        break;
    }
  }, [resolvedTheme, dark, light]);

  return src;
}
