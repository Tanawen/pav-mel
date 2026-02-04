"use client";

export type FilterType = "all" | "verre" | "decheterie";

interface FiltersProps {
  filter: FilterType;
  onChange: (f: FilterType) => void;
}

const OPTIONS: {
  value: FilterType;
  label: string;
  icon: string;
  active: string;
  idle: string;
}[] = [
  {
    value: "all",
    label: "Tous",
    icon: "📍",
    active: "bg-gray-800 text-white",
    idle: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  },
  {
    value: "verre",
    label: "PAV Verre",
    icon: "🥃",
    active: "bg-emerald-600 text-white",
    idle: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  },
  {
    value: "decheterie",
    label: "Déchèteries",
    icon: "🗑️",
    active: "bg-amber-500 text-white",
    idle: "bg-amber-50 text-amber-700 hover:bg-amber-100",
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
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === opt.value ? opt.active : opt.idle
          }`}
        >
          <span aria-hidden="true">{opt.icon}</span>
          {opt.label}
        </button>
      ))}
    </div>
  );
}
