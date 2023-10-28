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
import { type Metadata } from 'next';
import { Navigation } from '@/app/navigation';
import { Footer } from '@/app/footer';

export const metadata: Metadata = {
  title: 'WebVirtCloud - Take cloud providers to the next level',
  description: 'Self-hosted cloud platform solution',
  authors: { name: 'WebVirtCloud Team', url: 'https://webvirt.cloud' },
  themeColor: { color: '#fff', media: 'not screen' },
  robots: 'index, follow',
  openGraph: {
    images: '/public/',
  },
  keywords:
    'webvirtcloud, cloud, servers, kvm, virtualization, virtual machines, vms, webvirtmgr, webvirt, docker, kubernetes, k8s',
};

export default function Layout({ children, ...props }: PropsWithChildren) {
  return (
    <html lang="en" className="scroll-smooth">
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
        <GoogleAnalytics gaTrackingId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      ) : null}
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
