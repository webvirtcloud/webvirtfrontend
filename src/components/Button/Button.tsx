import { forwardRef, ReactNode } from 'react';
import tw from 'twin.macro';

interface Props {
  type?: 'submit' | 'button';
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, type = 'button', loading, disabled, ...rest }, ref): JSX.Element => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        css={tw`h-12 text-sm font-bold bg-cyan-500 hover:bg-cyan-700 transition-colors rounded-xl px-4`}
        {...rest}
      >
        {loading ? <span>Loading...</span> : children}
      </button>
    );
  },
);

export default Button;
