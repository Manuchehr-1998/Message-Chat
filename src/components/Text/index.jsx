import React from "react";

const sizes = {
  textxs: "text-[13px] font-normal",
  texts: "text-[24px] font-normal lg:text-[20px] md:text-[22px]",
};

const Text = ({
  children,
  className = "",
  as,
  size = "textxs",
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component
      className={`font-gilroymedium ${className} ${sizes[size]} `}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
