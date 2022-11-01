import { Link } from 'react-router-dom';
import tw, { css } from 'twin.macro';

import { ServerList, Settings } from '@/components/Icons';
import Switcher from '@/components/Switcher';

const bg = css`
  background-color: var(--color-bg-sidebar);
`;

const Sidebar = (): JSX.Element => {
  return (
    <aside css={[bg, tw`w-56 flex flex-col justify-between p-4`]}>
      <div>
        <Link css={tw`inline-flex items-center justify-center space-x-4`} to="/">
          <img
            css={tw`w-10 mb-16`}
            src={new URL('/src/assets/images/logo.svg', import.meta.url).href}
            alt="Logotype"
          />
        </Link>

        <ul css={tw`space-y-4`}>
          <li css={tw`opacity-50 hover:opacity-100`}>
            <Link to="/" css={tw`inline-flex items-center space-x-3`}>
              <ServerList />
              <span>Servers</span>
            </Link>
          </li>
          <li css={tw`opacity-50 hover:opacity-100`}>
            <Link to="/settings" css={tw`inline-flex items-center space-x-3`}>
              <Settings />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      <Switcher />
    </aside>
  );
};

export default Sidebar;
