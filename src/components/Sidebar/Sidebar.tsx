import { useAtom, useAtomValue } from 'jotai';
import { Link, NavLink } from 'react-router-dom';
import tw, { css } from 'twin.macro';

import { ServerList, Settings } from '@/components/Icons';
import UserMenu from '@/components/UserMenu';
import { useProfileStore } from '@/store/profile';
import { useProjectStore } from '@/store/project';

const bg = css`
  background-color: var(--color-bg-sidebar);
`;

const Sidebar = (): JSX.Element => {
  const [profile] = useAtom(useProfileStore);
  const project = useAtomValue(useProjectStore);

  return (
    <aside
      css={[bg, tw`fixed top-0 left-0 bottom-0 w-56 flex flex-col justify-between p-4`]}
    >
      <div>
        <Link css={tw`inline-flex items-center justify-center space-x-4`} to="/">
          <img
            css={tw`w-10 mb-16`}
            src={new URL('/src/assets/images/logo.svg', import.meta.url).href}
            alt="Logotype"
          />
        </Link>

        <ul css={tw`space-y-1`}>
          <li>
            <NavLink to={`/projects/${project?.uuid}/servers`}>
              {({ isActive }) => (
                <span
                  css={[
                    tw`w-full inline-flex items-center space-x-3 rounded-md transition-opacity p-2`,
                    isActive ? tw`bg-white/5` : tw`opacity-50 hover:opacity-100`,
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
                    tw`w-full inline-flex items-center space-x-3 rounded-md transition-opacity p-2`,
                    isActive ? tw`bg-white/5` : tw`opacity-50 hover:opacity-100`,
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
      <UserMenu profile={profile} />
    </aside>
  );
};

export default Sidebar;
