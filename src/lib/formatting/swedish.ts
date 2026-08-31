const numberFormatter = new Intl.NumberFormat("sv-SE");
const scoreFormatter = new Intl.NumberFormat("sv-SE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const oneDecimalFormatter = new Intl.NumberFormat("sv-SE", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const currencyFormatter = new Intl.NumberFormat("sv-SE", {
  maximumFractionDigits: 0,
});

export function formatInteger(value: number): string {
  return numberFormatter.format(value);
}

export function formatScore(value: number): string {
  return scoreFormatter.format(value);
}

export function formatSignedScore(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${scoreFormatter.format(value)}`;
}

export function formatPercent(value: number): string {
  return `${oneDecimalFormatter.format(value)} %`;
}

export function formatSek(value: number): string {
  return `${currencyFormatter.format(value)} kr`;
}

export function formatWineCount(value: number): string {
  return `${formatInteger(value)} ${value === 1 ? "vin" : "viner"}`;
}
