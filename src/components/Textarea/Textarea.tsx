import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import tw from 'twin.macro';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  rows?: number;
  required?: boolean;
  readonly?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

// eslint-disable-next-line react/display-name
const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    { id, name, label, required, readonly = false, rows = 5, ...rest },
    ref,
  ): JSX.Element => {
    return (
      <div>
        <label htmlFor={id} css={tw`inline-block mb-2 text-sm font-bold`}>
          {label}
        </label>

        <textarea
          id={id}
          name={name}
          ref={ref}
          rows={rows}
          required={required}
          readOnly={readonly}
          css={tw`w-full px-4 text-sm transition-colors border-2 border-transparent rounded-md focus:border-cyan-500 focus:ring-0 bg-input focus:bg-transparent`}
          {...rest}
        />
      </div>
    );
  },
);

export default Textarea;
