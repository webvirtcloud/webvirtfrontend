import {
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  useFloating,
} from '@floating-ui/react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MutableRefObject, ReactNode, useLayoutEffect, useRef } from 'react';
import tw from 'twin.macro';

import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';

import { Portal } from '../Portal';

type MenuProps = {
  source: MutableRefObject<HTMLButtonElement | null>;
  children: ReactNode;
  placement?: Placement;
  spacing?: number;
  isOpen: boolean;
  onClose: () => void;
};

type MenuFloatingProps = {
  source: MutableRefObject<HTMLButtonElement | null>;
  children: ReactNode;
  placement?: Placement;
  spacing?: number;
  isOpen: boolean;
  onClose: () => void;
};

const MenuFloating = ({
  source,
  children,
  spacing,
  placement = 'bottom',
  isOpen,
  onClose,
}: MenuFloatingProps) => {
  const menuRef = useRef<HTMLUListElement>();
  const { x, y, strategy, reference, floating } = useFloating({
    open: isOpen,
    placement,
    middleware: [offset(spacing), shift(), flip()],
    whileElementsMounted: autoUpdate,
  });

  useLayoutEffect(() => {
    if (source.current) {
      reference(source.current);
    }
  }, [reference, source]);

  useOnClickOutside(menuRef, () => onClose());

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.ul
          css={tw`py-2 z-30 px-1 space-y-1 rounded-md bg-base min-w-[128px] ring-1 ring-black/10 shadow-xl`}
          initial={{ opacity: 0, y: -16 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -16,
          }}
          transition={{ type: 'spring', duration: 0.35 }}
          ref={(node) => {
            menuRef.current = node as HTMLUListElement;
            floating(node);
          }}
          style={{
            left: x ?? undefined,
            top: y ?? undefined,
            position: strategy,
          }}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export const Menu = ({
  source,
  children,
  placement = 'bottom',
  spacing = 8,
  isOpen,
  onClose,
}: MenuProps) => {
  return (
    <Portal>
      <MenuFloating
        isOpen={isOpen}
        source={source}
        placement={placement}
        spacing={spacing}
        onClose={onClose}
      >
        {children}
      </MenuFloating>
    </Portal>
  );
};

export const MenuItem = ({ startIcon, children, ...props }) => {
  return (
    <li
      {...props}
      css={tw`flex items-center space-x-1.5 px-2 py-1 font-bold rounded-md cursor-pointer hover:bg-alt2`}
    >
      {startIcon}
      <span>{children}</span>
    </li>
  );
};
