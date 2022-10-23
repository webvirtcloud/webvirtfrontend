import React, { forwardRef, ComponentProps, ChangeEvent } from "react";

import styles from "./input.module.css";

interface Props {
  id: string;
  type: 'text' | 'email' | 'password';
  value: string;
  placeholder: string;
  label: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, Props>(({ id, label, ...rest }, ref) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
        {label}
      </label>
      <input id={id} ref={ref} className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" { ...rest } />
    </div>
  );
});

export default Input;
