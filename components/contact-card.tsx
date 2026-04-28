type ContactCardProps = {
  label: string;
  value: string;
};

export function ContactCard({ label, value }: ContactCardProps) {
  return (
    <div className="card-surface p-6">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">{label}</p>
      <p className="mt-4 text-lg font-medium text-white">{value}</p>
    </div>
  );
}
