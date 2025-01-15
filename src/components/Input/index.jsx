import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[5px]",
};

const variants = {
  fill: {
    gray_50: "bg-gray-50",
    white_A700: "bg-white-a700 text-gray-400",
  },
  outline: {
    indigo_50_02: "border-gray-300 border border-solid text-gray-600",
  },
};

const sizes = {
  sm: "h-[40px] pl-5 pr-3 text-[14px]",
  md: "h-[54px] px-[18px] text-[14px]",
  xs: "h-[32px] px-4 text-[13px]",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "fill",
      size = "xs",
      color = "white_A700",
      ...restProps
    },
    ref,
  ) => {
    return (
      <label
        className={`${className} flex items-center justify-center cursor-text  ${shape && shapes[shape]} ${variant && (variants[variant]?.[color] || variants[variant])} ${size && sizes[size]}`}
      >
        {!!label && label}
        {!!prefix && prefix}
        <input ref={ref} type={type} name={name} placeholder={placeholder} onChange={onChange} {...restProps} />
        {!!suffix && suffix}
      </label>
    );
  },
);
Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["sm", "md", "xs"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf(["gray_50", "white_A700", "indigo_50_02"]),
};

export { Input };
