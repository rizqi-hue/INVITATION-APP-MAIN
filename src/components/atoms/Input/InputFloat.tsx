import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  type: string;
  inputClassName?: string;
  labelClassName?: string;
  iconClassName?: string;
  isError?: any;
  errorMessage?: string;
  Icon?: any;
}

const FloatInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id = "",
      inputClassName = "border-gray-200 focus:border-primary-6000",
      labelClassName = "text-gray-400 peer-focus:text-primary-6000",
      iconClassName = "text-gray-400",
      errorMessage = "",
      label = "",
      Icon = "",
      children,
      type = "text",
      isError = false,
      ...args
    },
    ref
  ) => {
    if (isError) {
      inputClassName = "border-red-200 focus:border-red-600";
      labelClassName = "text-red-400 peer-focus:text-red-600";
      iconClassName = "text-red-400";
    }

    if (Icon) {
      return (
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              {Icon && <Icon className={`w-6 ${iconClassName}`} />}
            </div>
            <input
              ref={ref}
              type={type}
              id={`floating_${id}`}
              className={`block rounded-2xl px-2.5 pb-2 pl-10 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-2 ${inputClassName} appearance-none focus:outline-none focus:ring-0 peer`}
              placeholder=" "
              {...args}
            />
            <label
              htmlFor={`floating_${id}`}
              className={`absolute pl-10 text-sm ${labelClassName} duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3`}>
              {label}
            </label>
          </div>
          {isError && (
            <p
              id="filled_error_help"
              className="mt-1 pb-1 text-xs text-red-600 dark:text-red-400">
              <span className="font-medium">Oppss!</span> {errorMessage}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          id={`floating_${id}`}
          className="block rounded-2xl px-2.5 pb-2 pt-5 pl-4 w-full text-sm text-gray-900 bg-gray-50 border-2 border-gray-200 appearance-none  focus:outline-none focus:ring-0 focus:border-primary-6000 peer"
          placeholder=" "
          {...args}
        />
        <label
          htmlFor={`floating_${id}`}
          className="absolute text-sm pl-2 text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-primary-6000 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
          {label}
        </label>
      </div>
    );
  }
);

export default FloatInput;
