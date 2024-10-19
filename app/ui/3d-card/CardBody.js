// frontend/app/ui/3d-card/CardBody.js

"use client";

import React, { useState } from "react";

export function CardBody({ children, className }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative transform transition-transform duration-500 ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered ? "rotateY(10deg)" : "rotateY(0deg)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}
