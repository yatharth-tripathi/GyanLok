// frontend/app/ui/3d-card/CardItem.js

"use client";

import React from "react";

export function CardItem({ children, translateZ = 0, as: Component = "div", className, ...props }) {
  const style = {
    transform: `translateZ(${translateZ}px)`,
  };

  return (
    <Component className={`absolute ${className}`} style={style} {...props}>
      {children}
    </Component>
  );
}
