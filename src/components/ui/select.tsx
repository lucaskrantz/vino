"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: readonly SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function Select({ label, options, value, onValueChange, placeholder }: SelectProps) {
  return (
    <div className="select-field">
      <span className="control-label">{label}</span>
      <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger className="select-trigger" aria-label={label}>
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon aria-hidden="true">
            <ChevronDown size={16} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="select-content" position="popper" sideOffset={6}>
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectPrimitive.Item className="select-item" value={option.value} key={option.value}>
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="select-indicator">
                    <Check size={15} aria-hidden="true" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}
