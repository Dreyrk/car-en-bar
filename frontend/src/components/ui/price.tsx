export default function Price({
  className,
  amount,
  multiplicator,
}: {
  className?: string;
  amount: number;
  multiplicator?: number;
}) {
  return <span className={className ?? "font-semibold text-lg"}>{amount * (multiplicator ?? 1)} €</span>;
}
