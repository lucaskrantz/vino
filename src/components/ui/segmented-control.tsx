"use client";

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  label: string;
  options: readonly SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onValueChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div className={className}>
      <span className="sr-only">{label}</span>
      <div className="segmented-control" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className="segmented-control__item"
            data-state={option.value === value ? "active" : "inactive"}
            aria-pressed={option.value === value}
            onClick={() => onValueChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
