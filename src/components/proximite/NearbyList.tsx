"use client";

import type { PointWithDistance } from "@/lib/geo";
import { formatDistance, getDirectionsUrl } from "@/lib/geo";

interface NearbyListProps {
  places: PointWithDistance[];
  userPos: { lat: number; lng: number };
  onPlaceClick: (place: PointWithDistance) => void;
}

export default function NearbyList({
  places,
  userPos,
  onPlaceClick,
}: NearbyListProps) {
  if (places.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
        <span className="text-2xl block mb-2" aria-hidden="true">🔍</span>
        <p className="text-sm text-gray-500">
          Aucun point de dépôt avec ce filtre.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
        Les {places.length} plus proches
      </h2>

      {places.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-emerald-300 hover:shadow-sm transition-all"
          onClick={() => onPlaceClick(p)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onPlaceClick(p)}
          aria-label={`${p.name}, à ${formatDistance(p.distance)}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    p.type === "verre"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {p.type === "verre" ? "🥃 Verre" : "🗑️ Déchèterie"}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {formatDistance(p.distance)}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 truncate">{p.name}</h3>
              <p className="text-sm text-gray-500 truncate">{p.address}</p>
            </div>

            {/* Directions shortcut */}
            <a
              href={getDirectionsUrl(userPos.lat, userPos.lng, p.lat, p.lng)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              aria-label={`Itinéraire vers ${p.name}`}
            >
              🗺️
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
