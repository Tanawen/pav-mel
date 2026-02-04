"use client";

import { useEffect } from "react";
import type { PointMEL } from "@/lib/geo";
import { getDirectionsUrl, formatDistance, haversineDistance } from "@/lib/geo";

interface PlaceDrawerProps {
  place: PointMEL;
  userPos: { lat: number; lng: number } | null;
  onClose: () => void;
}

export default function PlaceDrawer({
  place,
  userPos,
  onClose,
}: PlaceDrawerProps) {
  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const distance = userPos
    ? haversineDistance(userPos.lat, userPos.lng, place.lat, place.lng)
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Détails – ${place.name}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel – bottom-sheet on mobile, centred modal on sm+ */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto animate-slide-up">
        {/* Drag handle (mobile visual hint) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-3 sm:right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="px-6 pb-6 pt-2 sm:pt-6">
          {/* Type badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold mb-3 ${
              place.type === "verre"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {place.type === "verre" ? "🥃 PAV Verre" : "🗑️ Déchèterie"}
          </span>

          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {place.name}
          </h2>
          <p className="text-gray-500 text-sm mb-4">{place.address}</p>

          {/* Distance badge */}
          {distance !== null && (
            <p className="text-sm text-emerald-700 font-medium mb-4 flex items-center gap-1.5">
              <span aria-hidden="true">📍</span> À {formatDistance(distance)} de vous
            </p>
          )}

          {/* Horaires (déchèteries) */}
          {place.hours && (
            <div className="mb-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Horaires
              </span>
              <p className="text-sm text-gray-700 mt-0.5">{place.hours}</p>
            </div>
          )}

          {/* Notes */}
          {place.notes && (
            <div className="mb-5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Notes
              </span>
              <p className="text-sm text-gray-700 mt-0.5">{place.notes}</p>
            </div>
          )}

          {/* Primary action – itinerary (only when user position is known) */}
          {userPos && (
            <a
              href={getDirectionsUrl(
                userPos.lat,
                userPos.lng,
                place.lat,
                place.lng
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              🗺️ Voir l'itinéraire
            </a>
          )}

          {/* Secondary action – locate on map */}
          <a
            href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}#map=15/${place.lat}/${place.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full text-center py-2.5 text-emerald-600 font-medium rounded-xl border border-emerald-200 hover:bg-emerald-50 transition-colors text-sm ${
              userPos ? "mt-2" : ""
            }`}
          >
            Voir sur la carte
          </a>
        </div>
      </div>
    </div>
  );
}
