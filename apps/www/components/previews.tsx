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
    light: '/screen_light.png',
    dark: '/screen_dark.png',
  });

  if (!src) return null;

  return (
    <Image
      className={cx(['rounded-xl border md:shadow-lg', className])}
      src={src}
      width={1300}
      height={900}
      alt="main screen"
      priority
      loading="eager"
    />
  );
}

export function MobilePreview(props: PreviewProps) {
  const { className } = props;

  const src = useThemedImagePath({
    light: '/screen_mobile_white.png',
    dark: '/screen_mobile_dark.png',
  });

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
  const [src, setSrc] = useState<string>(
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  );

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
