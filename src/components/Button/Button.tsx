import { forwardRef, ReactNode } from 'react';
import tw from 'twin.macro';

interface Props {
  type?: 'submit' | 'button';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
}

const getVarianStyle = ({ variant }: { variant: Props['variant'] }) => {
  switch (variant) {
    case 'primary': {
      return tw`bg-cyan-500 hover:bg-cyan-700`;
    }
    case 'danger': {
      return tw`border bg-red-50 border-red-300 text-red-600`;
    }
    default: {
      return tw`border hover:bg-neutral-100`;
    }
  }
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant,
      children,
      type = 'button',
      size = 'md',
      loading,
      fullWidth,
      disabled,
      ...rest
    },
    ref,
  ): JSX.Element => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        css={[
          tw`text-sm text-body font-bold transition-colors rounded-md`,
          size === 'sm'
            ? tw`h-6 px-1.5`
            : size === 'md'
            ? tw`h-8 px-4`
            : size === 'lg'
            ? tw`h-10 px-3`
            : size === 'xl'
            ? tw`h-12 px-4`
            : tw``,
          disabled || loading ? tw`cursor-not-allowed bg-white/10` : tw``,
          getVarianStyle({ variant }),
          fullWidth ? tw`w-full` : ``,
        ]}
        {...rest}
      >
        {loading ? <span>Loading...</span> : children}
      </button>
    );
  },
);

Button.displayName = 'Button';
