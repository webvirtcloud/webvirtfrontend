import { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
  onEscapeKeyDown: () => void;
};
export default function DismissibleLayer({ children, onEscapeKeyDown, ...rest }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscapeKeyDown();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscapeKeyDown]);

  return <div {...rest}>{children}</div>;
}
