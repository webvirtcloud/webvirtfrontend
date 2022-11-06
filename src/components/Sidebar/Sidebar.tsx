import { Link, NavLink } from 'react-router-dom';
import tw, { css } from 'twin.macro';

import { ServerList, Settings } from '@/components/Icons';
import Switcher from '@/components/Switcher';

const bg = css`
  background-color: var(--color-bg-sidebar);
`;

const Sidebar = (): JSX.Element => {
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

        <ul css={tw`space-y-4`}>
          <li>
            <NavLink to="/servers">
              {({ isActive }) => (
                <span
                  css={[
                    tw`inline-flex items-center space-x-3`,
                    !isActive && tw`opacity-50 hover:opacity-100`,
                  ]}
                >
                  {isActive}
                  <ServerList />
                  <span>Servers</span>
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings">
              {({ isActive }) => (
                <span
                  css={[
                    tw`inline-flex items-center space-x-3`,
                    !isActive && tw`opacity-50 hover:opacity-100`,
                  ]}
                >
                  {isActive}
                  <Settings />
                  <span>Settings</span>
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
      <Switcher />
    </aside>
  );
};

export default Sidebar;
