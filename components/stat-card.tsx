type StatCardProps = {
  value: string;
  label: string;
};

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="card-surface p-6">
      <p className="text-4xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-3 max-w-xs text-sm leading-6 text-white/62">{label}</p>
    </div>
  );
}
