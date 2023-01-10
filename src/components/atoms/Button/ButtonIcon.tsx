import Button, { ButtonProps } from "./Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonIcon: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-gray-100 hover:bg-gray-150 text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export default ButtonIcon;
