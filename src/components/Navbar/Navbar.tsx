import { useAtom, useAtomValue } from 'jotai';
import { Link, NavLink } from 'react-router-dom';
import tw from 'twin.macro';

import { ServerList, Settings } from '@/components/Icons';
import ProjectSelector from '@/components/ProjectSelector';
import UserMenu from '@/components/UserMenu';
import { useProfileStore } from '@/store/profile';
import { useProjectStore } from '@/store/project';

const Navbar = (): JSX.Element => {
  const [profile] = useAtom(useProfileStore);
  const project = useAtomValue(useProjectStore);

  return (
    <nav css={tw`bg-base sticky top-0 left-0 right-0 flex flex-col justify-between`}>
      <div css={tw`container mx-auto p-4`}>
        <div css={tw`flex items-center justify-between`}>
          <div css={tw`flex items-center space-x-4 mb-4`}>
            <Link css={tw`inline-flex items-center justify-center space-x-4`} to="/">
              <img
                css={tw`w-10`}
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
          <li>
            <NavLink to={`/projects/${project?.uuid}/servers`}>
              {({ isActive }) => (
                <span
                  css={[
                    tw`w-full inline-flex items-center space-x-3 rounded-md transition-opacity p-2`,
                    isActive
                      ? tw`bg-interactive-hover`
                      : tw`opacity-50 hover:opacity-100`,
                  ]}
                >
                  <ServerList />
                  <span>Virtances</span>
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings">
              {({ isActive }) => (
                <span
                  css={[
                    tw`w-full inline-flex items-center space-x-3 rounded-md transition-colors p-2`,
                    isActive ? tw`bg-interactive-hover` : tw`text-alt2 hover:text-body`,
                  ]}
                >
                  <Settings />
                  <span>Settings</span>
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
