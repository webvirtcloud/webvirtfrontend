import { useSetAtom } from 'jotai';
import { Outlet } from 'react-router-dom';
import useSWR from 'swr';
import tw from 'twin.macro';

import { getProfile } from '@/api/account';
import { useUserStore } from '@/entities/user';
import { Navbar } from '@/widgets/nav-bar';

export function DefaultLayout() {
  const setProfile = useSetAtom(useUserStore);

  useSWR('/profile/', getProfile, {
    onSuccess(data) {
      setProfile(data.profile);
    },
  });

  return (
    <main css={tw`flex flex-col min-h-screen`}>
      <Navbar />
      <div css={tw`container flex-1 px-4 py-8 mx-auto`}>
        <Outlet />
      </div>
    </main>
  );
}
