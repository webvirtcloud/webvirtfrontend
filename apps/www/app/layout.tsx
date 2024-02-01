import '@/styles/globals.css';
import '@fontsource/outfit/100.css';
import '@fontsource/outfit/200.css';
import '@fontsource/outfit/300.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';
import '@fontsource/outfit/800.css';
import '@fontsource/outfit/900.css';
import GoogleAnalytics from '@/app/google-analytics';
import { type PropsWithChildren } from 'react';
import { Viewport, type Metadata } from 'next';
import { Navigation } from '@/app/navigation';
import { Footer } from '@/app/footer';
import { ThemeProvider } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://webvirt.cloud'),
  title: 'WebVirtCloud - Free, open source cloud platform',
  description:
    'Meet a modern and powerful all-in-one cloud management platform for your company & your clients',
  authors: { name: 'WebVirtCloud Team', url: 'https://webvirt.cloud' },
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://webvirt.cloud',
    title: 'WebVirtCloud',
    description:
      'Meet a modern and powerful all-in-one cloud management platform for your company & your clients',
    siteName: 'WebVirtCloud',
    images: [
      {
        url: 'https://webvirt.cloud/opengraph-image.png',
      },
    ],
  },
  keywords:
    'webvirtcloud, cloud, servers, kvm, virtualization, virtual machines, vms, webvirtmgr, webvirt, docker, kubernetes, k8s',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function Layout({ children, ...props }: PropsWithChildren) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
        <GoogleAnalytics gaTrackingId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      ) : null}
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
