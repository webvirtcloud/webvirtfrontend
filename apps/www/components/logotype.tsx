import Image from 'next/image';
import Link from 'next/link';

export function Logotype() {
  return (
    <Link href="/" className="flex items-center space-x-4">
      <Image
        width={48}
        height={48}
        className="h-10 w-10"
        src="/logo.svg"
        alt="WebVirtCloud logotype"
      />
      <span className="text-lg font-medium">WebVirtCloud</span>
    </Link>
  );
}
