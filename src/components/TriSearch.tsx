'use client';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TriSearch({ value, onChange }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex gap-2">
        <label htmlFor="tri-search-input" className="sr-only">
          Nom de l&apos;objet à rechercher
        </label>

        <input
          id="tri-search-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ex : pile, ampoule, carton pizza, poêle, vieux t-shirt…"
          autoComplete="off"
          autoFocus
          className="flex-1 px-4 py-3 md:py-4 text-base md:text-lg border-2 border-gray-200 focus:border-emerald-400 rounded-xl outline-none transition-colors"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="px-3 py-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Effacer la recherche"
          >
            ✕
          </button>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Tapez le nom d&apos;un objet — les fautes de frappe sont tolérées.
      </p>
    </div>
  );
}
