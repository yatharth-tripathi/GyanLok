// frontend/app/ui/3d-card/CardContainer.js

"use client";

import React from "react";

export function CardContainer({ children, className }) {
  return (
    <div
      className={`perspective-1000 ${className}`}
      style={{ perspective: "1000px" }}
    >
      {children}
    </div>
  );
}
