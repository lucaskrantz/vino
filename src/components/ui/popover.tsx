"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { X } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

interface PopoverProps {
  trigger: ReactElement;
  title: string;
  children: ReactNode;
  align?: "start" | "center" | "end";
}

export function Popover({ trigger, title, children, align = "center" }: PopoverProps) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content className="popover-content" align={align} sideOffset={8}>
          <div className="popover-content__header">
            <strong>{title}</strong>
            <PopoverPrimitive.Close className="icon-button" aria-label="Stäng">
              <X size={16} />
            </PopoverPrimitive.Close>
          </div>
          {children}
          <PopoverPrimitive.Arrow className="popover-arrow" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
