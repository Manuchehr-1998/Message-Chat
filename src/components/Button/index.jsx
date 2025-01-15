import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-md",
};
const variants = {
  fill: {
    indigo_900_01: "bg-indigo-900_01 text-white-a700",
  },
  gradient: {
    deep_purple_A400_6c_deep_purple_A200_6c: "bg-gradient shadow-lg text-white-a700",
  },
};
const sizes = {
  xs: "h-[40px] px-[34px] text-[16px]",
  sm: "h-[54px] px-[34px] text-[14px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "xs",
  color = "indigo_900_01",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap text-white-a700 ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color]}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm"]),
  variant: PropTypes.oneOf(["fill", "gradient"]),
  color: PropTypes.oneOf(["indigo_900_01", "deep_purple_A400_6c_deep_purple_A200_6c"]),
};

export { Button };
