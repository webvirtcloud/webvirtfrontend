import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import type { Profile } from '@/api/account';
import { ArrowDown, Logout, Settings } from '@/components/Icons';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

const Switcher = ({ profile }: { profile: Profile }): JSX.Element => {
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
    <div css={tw`relative`} ref={ref}>
      <button
        onClick={() => toggle(!isOpen)}
        type="button"
        css={tw`flex items-center justify-between text-left bg-black/20 hover:bg-black/25 transition-opacity rounded-full py-2 px-3`}
      >
        <div css={tw`flex items-center space-x-2`}>
          <figure
            css={tw`flex-shrink-0 flex items-center justify-center font-bold w-8 h-8 bg-cyan-500 rounded-full`}
          >
            {profile && profile.email[0].toUpperCase()}
          </figure>
          <div>
            <h4 css={tw`font-bold`}>
              {profile?.first_name} {profile?.last_name}
            </h4>
            {/* <p css={tw`text-white/50 text-xs`}></p> */}
          </div>
        </div>

        <ArrowDown />
      </button>
      {isOpen && (
        <ul
          css={tw`bg-white/10 absolute bottom-[calc(100% + 8px)] left-0 right-0 rounded-xl p-2`}
        >
          <li>
            <Link
              css={tw`flex items-center w-full text-left p-2 hover:bg-black/20 rounded space-x-2`}
              to="/settings"
            >
              <Settings />
              <span css={tw`font-bold`}>Settings</span>
            </Link>
          </li>
          <li css={tw`border-b border-black/30 my-1`}></li>
          <li>
            <button
              css={tw`flex items-center w-full text-left p-2 hover:bg-black/20 rounded space-x-2`}
              type="button"
              onClick={() => handleLogout()}
            >
              <Logout />
              <span css={tw`font-bold`}>Logout</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Switcher;
