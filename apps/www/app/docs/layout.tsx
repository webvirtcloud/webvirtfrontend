import { type PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import { Sidebar } from './sidebar';
import { useDocsNavigation } from './use-docs-navigation';

const MobileSidebar = dynamic(() => import('./mobile-sidebar'), { ssr: false });

export const metadata = {
  title: 'WebVirtCloud Docs',
  description:
    'Here is a documentation of WebVirtCloud where you can find all information needed to get started, how to use API and so on',
};

export default function Layout({ children }: PropsWithChildren) {
  const { navigation } = useDocsNavigation();

  return (
    <>
      <MobileSidebar navigation={navigation} />
      <main className="container relative mx-auto px-2 py-12 md:flex md:px-0 lg:px-8">
        <Sidebar navigation={navigation} />
        {children}
      </main>
    </>
  );
}
