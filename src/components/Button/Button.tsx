import { forwardRef, ReactNode } from 'react';
import tw from 'twin.macro';

interface Props {
  type?: 'submit' | 'button';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { children, type = 'button', size = 'xl', loading, disabled, ...rest },
    ref,
  ): JSX.Element => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        css={[
          tw`text-sm font-bold transition-colors rounded-md`,
          size === 'sm'
            ? tw`h-6 px-1.5`
            : size === 'md'
            ? tw`h-8 px-2`
            : size === 'lg'
            ? tw`h-10 px-3`
            : size === 'xl'
            ? tw`h-12 px-4`
            : tw``,
          disabled || loading
            ? tw`cursor-not-allowed bg-white/10`
            : tw`bg-cyan-500 hover:bg-cyan-700`,
        ]}
        {...rest}
      >
        {loading ? <span>Loading...</span> : children}
      </button>
    );
  },
);

export default Button;
