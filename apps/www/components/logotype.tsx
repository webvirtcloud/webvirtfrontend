import Image from 'next/image';
import Link from 'next/link';

export function Logotype() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        width={32}
        height={32}
        className="h-8 w-8"
        src="/logo.svg"
        alt="WebVirtCloud logotype"
      />
      <span className="text-lg font-semibold">WebVirtCloud</span>
    </Link>
  );
}
