"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { formatSek } from "@/lib/formatting/swedish";

interface RangeSliderProps {
  label: string;
  value: readonly [number, number];
  min: number;
  max: number;
  step?: number;
  onValueChange: (value: [number, number]) => void;
  onValueCommit?: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
}

export function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onValueChange,
  onValueCommit,
  formatValue = formatSek,
}: RangeSliderProps) {
  return (
    <div className="range-control">
      <div className="range-control__header">
        <span className="control-label">{label}</span>
        <output aria-live="polite">
          {formatValue(value[0])}–{formatValue(value[1])}
        </output>
      </div>
      <SliderPrimitive.Root
        className="range-slider"
        value={[...value]}
        min={min}
        max={max}
        step={step}
        minStepsBetweenThumbs={1}
        onValueChange={(nextValue) => {
          if (nextValue.length === 2) {
            onValueChange([nextValue[0], nextValue[1]]);
          }
        }}
        onValueCommit={(nextValue) => {
          if (nextValue.length === 2) {
            onValueCommit?.([nextValue[0], nextValue[1]]);
          }
        }}
        aria-label={label}
      >
        <SliderPrimitive.Track className="range-slider__track">
          <SliderPrimitive.Range className="range-slider__range" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="range-slider__thumb"
          aria-label={`${label}, lägsta värde`}
          aria-valuetext={formatValue(value[0])}
        />
        <SliderPrimitive.Thumb
          className="range-slider__thumb"
          aria-label={`${label}, högsta värde`}
          aria-valuetext={formatValue(value[1])}
        />
      </SliderPrimitive.Root>
      <div className="range-control__bounds" aria-hidden="true">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}
