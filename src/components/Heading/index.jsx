import React from "react";

const sizes = {
  headingxs: "text-[16px] font-bold lg:text-[13px]",
  headings: "text-[26px] font-bold lg:text-[22px] md:text-[24px] sm:text-[22px]",
  headingmd: "text-[34px] font-bold lg:text-[28px] md:text-[32px] sm:text-[30px]",
};

const Heading = ({ children, className = "", size = "headingxs", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-indigo-900 font-plusjakartasans ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
