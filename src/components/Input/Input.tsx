import React, { forwardRef } from 'react';
import tw from 'twin.macro';

interface Props {
  id: string;
  name: string;
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder: string;
  label: string;
  required?: boolean;
  readonly?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, Props>(
  (
    { id, name, label, type = 'text', required, readonly = false, ...rest },
    ref,
  ): JSX.Element => {
    return (
      <div>
        <label htmlFor={id} css={tw`inline-block text-sm font-bold mb-2`}>
          {label}
        </label>

        <input
          id={id}
          name={name}
          ref={ref}
          type={type}
          required={required}
          readOnly={readonly}
          css={tw`h-12 text-sm w-full border-2 border-transparent focus:border-cyan-500 focus:ring-0 transition-colors bg-input focus:bg-transparent rounded-md px-4`}
          {...rest}
        />
      </div>
    );
  },
);

export default Input;
