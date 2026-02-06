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
      <div className="card-mel p-6 text-center">
        <p className="text-sm text-[var(--gray-500)]">
          Aucun point de dépôt avec ce filtre.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-bold text-[var(--gray-400)] uppercase tracking-wider">
        Les {places.length} plus proches
      </h2>

      {places.map((p) => (
        <div
          key={p.id}
          className="card-mel card-mel-interactive p-4 cursor-pointer"
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
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${
                    p.type === "verre"
                      ? "bg-red-100 text-red-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.type === "verre" ? "Verre" : "Déchèterie"}
                </span>
                <span className="text-xs text-[var(--gray-400)] font-medium">
                  {formatDistance(p.distance)}
                </span>
              </div>
              <h3 className="font-semibold text-[var(--gray-900)] truncate">{p.name}</h3>
              <p className="text-sm text-[var(--gray-500)] truncate">{p.address}</p>
            </div>

            {/* Directions shortcut */}
            <a
              href={getDirectionsUrl(userPos.lat, userPos.lng, p.lat, p.lng)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 p-2 text-[var(--mel-red)] hover:bg-[var(--mel-red-light)] rounded-md transition-colors"
              aria-label={`Itinéraire vers ${p.name}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
