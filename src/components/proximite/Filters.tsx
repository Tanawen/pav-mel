"use client";

export type FilterType = "all" | "verre" | "decheterie";

interface FiltersProps {
  filter: FilterType;
  onChange: (f: FilterType) => void;
}

const OPTIONS: {
  value: FilterType;
  label: string;
  active: string;
  idle: string;
}[] = [
  {
    value: "all",
    label: "Tous",
    active: "bg-[var(--gray-800)] text-white",
    idle: "bg-[var(--gray-100)] text-[var(--gray-700)] hover:bg-[var(--gray-200)]",
  },
  {
    value: "verre",
    label: "PAV Verre",
    active: "bg-red-600 text-white",
    idle: "bg-red-50 text-red-700 hover:bg-red-100",
  },
  {
    value: "decheterie",
    label: "Déchèteries",
    active: "bg-red-500 text-white",
    idle: "bg-red-50 text-red-700 hover:bg-red-100",
  },
];

export default function Filters({ filter, onChange }: FiltersProps) {
  return (
    <div className="flex gap-2 flex-wrap" role="group" aria-label="Filtrer par type">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={filter === opt.value}
          className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
            filter === opt.value ? opt.active : opt.idle
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
