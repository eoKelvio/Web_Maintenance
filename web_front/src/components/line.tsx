"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Definindo as variantes da linha
const lineVariants = cva(
  "transition-colors", // Adiciona transição suave ao mudar de tema
  {
    variants: {
      thickness: {
        thin: "border border-border",
        medium: "border-1 border-border",
        thick: "border-4 border-border",
      },
      color: {
        primary: "border-primary",
        secondary: "border-secondary",
        accent: "border-accent",
      },
    },
    defaultVariants: {
      thickness: "medium",
      color: "primary",
    },
  }
);

export interface LineProps extends VariantProps<typeof lineVariants> {}

// Componente Line utilizando as variantes definidas
export default function Line({ thickness, color, ...props }: LineProps) {
  return (
    <div className="container mx-auto mt-4">
      <hr className={cn(lineVariants({ thickness, color }))} {...props} />
    </div>
  );
}

Line.displayName = "Line";
