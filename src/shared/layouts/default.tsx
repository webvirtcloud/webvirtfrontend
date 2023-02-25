import { useSetAtom } from 'jotai';
import { Outlet } from 'react-router-dom';
import tw from 'twin.macro';

import { getProfile } from '@/api/account';
import Navbar from '@/components/Navbar';
import { useProfileStore } from '@/store/profile';

export function DefaultLayout() {
  const setProfile = useSetAtom(useProfileStore);

  const fetch = async () => {
    const response = await getProfile();
    setProfile(response.profile);
  };

  fetch();

  return (
    <main css={tw`flex flex-col min-h-screen`}>
      <Navbar />
      <div css={tw`container flex-1 px-4 py-8 mx-auto`}>
        <Outlet />
      </div>
    </main>
  );
}
