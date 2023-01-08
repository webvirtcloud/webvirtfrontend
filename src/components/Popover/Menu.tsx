import {
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  useFloating,
} from '@floating-ui/react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, Ref, useLayoutEffect } from 'react';
import tw from 'twin.macro';

import { Portal } from '../Portal';

type MenuProps = {
  source: Ref<HTMLButtonElement>;
  children: ReactNode;
  placement?: Placement;
  spacing?: number;
  isOpen: boolean;
};

type MenuFloatingProps = {
  source: Ref<HTMLButtonElement>;
  children: ReactNode;
  placement?: Placement;
  spacing?: number;
  isOpen: boolean;
};

const MenuFloating = ({
  source,
  children,
  spacing,
  placement = 'bottom',
  isOpen,
}: MenuFloatingProps) => {
  const { x, y, strategy, reference, floating } = useFloating({
    open: isOpen,
    placement,
    middleware: [offset(spacing), shift(), flip()],
    whileElementsMounted: autoUpdate,
  });

  useLayoutEffect(() => {
    reference(source.current);
  }, [reference, source]);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.ul
          css={tw`py-2 px-1 space-y-1 rounded-md bg-base min-w-[128px] ring-1 ring-black/5 shadow-xl`}
          initial={{ opacity: 0, y: -16 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -16,
          }}
          transition={{ type: 'spring' }}
          ref={floating}
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
}: MenuProps) => {
  return (
    <Portal>
      <MenuFloating
        isOpen={isOpen}
        source={source}
        placement={placement}
        spacing={spacing}
      >
        {children}
      </MenuFloating>
    </Portal>
  );
};

export const MenuItem = ({ children, ...props }) => {
  return (
    <li {...props} css={tw`px-2 py-1 font-bold rounded-md cursor-pointer hover:bg-alt2`}>
      {children}
    </li>
  );
};
