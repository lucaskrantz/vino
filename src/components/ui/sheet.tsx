"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
}

export function Sheet({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
}: SheetProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="sheet-overlay" />
        <DialogPrimitive.Content className="sheet-content">
          <div className="sheet-content__header">
            <div>
              <DialogPrimitive.Title className="sheet-title">{title}</DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description className="sheet-description">
                  {description}
                </DialogPrimitive.Description>
              ) : null}
            </div>
            <DialogPrimitive.Close className="icon-button" aria-label="Stäng filter">
              <X aria-hidden="true" size={20} />
            </DialogPrimitive.Close>
          </div>
          <div className="sheet-content__body">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
