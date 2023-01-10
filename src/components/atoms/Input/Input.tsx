import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  Icon?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "py-1 px-2",
      fontClass = "text-sm font-normal",
      rounded = "rounded-2xl",
      Icon = "",
      children,
      type = "text",
      ...args
    },
    ref
  ) => {
    return (
      <div
        className={`flex items-center border-2 ${sizeClass} ${rounded} ${className}`}>
        {Icon && <Icon className="w-6 text-gray-400" />}

        <input
          ref={ref}
          type={type}
          className={`${Icon ? "pl-2" : ""} ${fontClass}
            w-full outline-none border-none border-transparent placeholder-gray-300 text-gray-600 focus:border-transparent focus:bg-transparent focus:ring-0
          `}
          {...args}
        />
      </div>
    );
  }
);

export default Input;
