import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import type { Profile } from '@/api/account';
import { ArrowDown, Logout, Settings } from '@/components/Icons';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

type Props = {
  profile: Profile | undefined;
};

const UserMenu = ({ profile }: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    window.localStorage.removeItem('token');

    navigate('/sign-in');
  };

  useEffect(() => {
    if (isOpen) {
      toggle(false);
    }
  }, [location]);

  useOnClickOutside(ref, () => toggle(false));

  return (
    <div css={tw`relative min-w-[132px]`} ref={ref}>
      <button
        onClick={() => toggle(!isOpen)}
        type="button"
        css={tw`w-full flex items-center justify-between text-left hover:bg-interactive-hover transition-colors duration-300 rounded-md space-x-2 p-2`}
      >
        <div css={tw`flex items-center space-x-2`}>
          <div css={tw`min-w-0 overflow-hidden`}>
            <h4 css={tw`font-bold`}>{profile?.email}</h4>
          </div>
        </div>

        <ArrowDown />
      </button>
      {isOpen && (
        <div
          css={tw`bg-alt absolute top-[calc(100% + 8px)] left-0 right-0 rounded-md p-2`}
        >
          <ul>
            <li>
              <Link
                css={tw`flex items-center w-full text-left p-2 hover:bg-interactive-hover rounded space-x-2`}
                to="/settings"
              >
                <Settings />
                <span css={tw`font-bold`}>Settings</span>
              </Link>
            </li>
            <li>
              <button
                css={tw`flex items-center w-full text-left p-2 hover:bg-interactive-hover rounded space-x-2`}
                type="button"
                onClick={() => handleLogout()}
              >
                <Logout />
                <span css={tw`font-bold`}>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
