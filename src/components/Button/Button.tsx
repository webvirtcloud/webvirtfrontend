import { forwardRef, ReactNode } from 'react';
import tw from 'twin.macro';

interface Props {
  type?: 'submit' | 'button';
  children: ReactNode;
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, type = 'button', ...rest }, ref): JSX.Element => {
    return (
      <button
        ref={ref}
        type={type}
        css={tw`h-12 text-sm font-bold bg-cyan-500 hover:bg-cyan-700 transition-colors rounded-xl px-4`}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export default Button;
