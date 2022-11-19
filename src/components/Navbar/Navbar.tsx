import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import tw from 'twin.macro';

import { Key, ServerList, Settings } from '@/components/Icons';
import ProjectSelector from '@/components/ProjectSelector';
import UserMenu from '@/components/UserMenu';
import { useProfileStore } from '@/store/profile';
import { useProjectStore } from '@/store/project';

const Navbar = (): JSX.Element => {
  const profile = useAtomValue(useProfileStore);
  const project = useAtomValue(useProjectStore);

  const [links, setLinks] = useState<{ to: string; name: string }[]>([]);

  useEffect(() => {
    if (project) {
      setLinks([
        { to: `/projects/${project?.uuid}/servers`, name: 'Virtances' },
        { to: `/projects/${project?.uuid}/ssh`, name: 'SSH' },
        { to: `/settings`, name: 'Settings' },
      ]);
    }
  }, [project]);

  return (
    <nav
      css={tw`bg-base sticky top-0 left-0 right-0 flex flex-col justify-between shadow-sm border-b`}
    >
      <div css={tw`container mx-auto p-4`}>
        <div css={tw`flex items-center justify-between`}>
          <div css={tw`flex items-center space-x-4 mb-4`}>
            <Link css={tw`inline-flex items-center justify-center space-x-4`} to="/">
              <img
                css={tw`w-8`}
                src={new URL('/src/assets/images/logo.svg', import.meta.url).href}
                alt="Logotype"
              />
            </Link>
            <div css={tw`w-px h-6 bg-alt2`}></div>
            <ProjectSelector />
          </div>
          <UserMenu profile={profile} />
        </div>

        <ul css={tw`flex items-center space-x-2`}>
          {links.map((link) => (
            <li key={link.name}>
              <NavLink to={link.to}>
                {({ isActive }) => (
                  <span
                    css={[
                      tw`w-full inline-flex items-center space-x-2 rounded-md transition-opacity p-2`,
                      isActive
                        ? tw`bg-interactive-hover`
                        : tw`opacity-50 hover:opacity-100`,
                    ]}
                  >
                    {link.name === 'Virtances' && <ServerList />}
                    {link.name === 'SSH' && <Key />}
                    {link.name === 'Settings' && <Settings />}
                    <span css={tw`font-semibold`}>{link.name}</span>
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
