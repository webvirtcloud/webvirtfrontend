import ArrowLeftOnRectangleIcon from '@heroicons/react/20/solid/ArrowLeftOnRectangleIcon';
import ChevronUpDownIcon from '@heroicons/react/20/solid/ChevronUpDownIcon';
import Cog6ToothIcon from '@heroicons/react/20/solid/Cog6ToothIcon';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import { User } from '@/entities/user';
import { Button } from '@/shared/ui/Button';
import { Menu, MenuItem } from '@/shared/ui/Menu';

type Props = {
  user: User | undefined;
};

export function UserMenu({ user }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reference = useRef<HTMLButtonElement>(null);
  const [isOpen, toggle] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('token');

    window.location.href = '/sign-in';
  };

  const goToSettings = () => {
    navigate('/settings/');

    toggle(false);
  };

  return user ? (
    <div ref={ref}>
      <Button
        ref={reference}
        variant="secondary"
        endIcon={<ChevronUpDownIcon width={16} height={16} />}
        onClick={() => toggle(!isOpen)}
      >
        <div css={tw`min-w-0 overflow-hidden max-w-[168px]`}>
          <h4 css={tw`font-bold truncate`}>{user?.email}</h4>
        </div>
      </Button>
      <Menu
        isOpen={isOpen}
        source={reference}
        placement="bottom-end"
        onClose={() => toggle(false)}
      >
        <MenuItem
          startIcon={<Cog6ToothIcon width={16} height={16} />}
          onClick={() => goToSettings()}
        >
          Settings
        </MenuItem>
        <MenuItem
          startIcon={<ArrowLeftOnRectangleIcon width={16} height={16} />}
          onClick={() => handleLogout()}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  ) : (
    <div css={tw`bg-alt h-8 w-32 rounded animate-pulse`}></div>
  );
}
