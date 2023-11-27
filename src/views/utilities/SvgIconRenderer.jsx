import React from "react";

const SvgIconRenderer = ({ color = "text-gray-500", size = "w-2", className, children, handleClick }) => {
  return (
    <svg viewBox="0 0 576 512" className={`fill-current ${color} ${size} ${className}`} onClick={handleClick}>
      {children}
    </svg>
  );
};

export default SvgIconRenderer;
