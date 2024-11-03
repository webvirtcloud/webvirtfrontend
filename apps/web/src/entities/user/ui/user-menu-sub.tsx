import { LucideMoon } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from 'ui/components/dropdown-menu';

export function UserMenuSub() {
  const [theme, setTheme] = useState('dark');

  function onThemeChange(value: string) {
    if (value === 'system') {
      localStorage.removeItem('theme');
      if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
      setTheme('system');
      return;
    }

    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (value === 'light') {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', value);
    setTheme(value);
  }

  useEffect(() => {
    const localStorageValue = localStorage.getItem('theme');
    if (localStorageValue) {
      setTheme(localStorageValue);
    } else {
      setTheme('system');
    }
  });
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <LucideMoon className="mr-2 h-4 w-4" />
        Change theme
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup value={theme} onValueChange={onThemeChange}>
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
