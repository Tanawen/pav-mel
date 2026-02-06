"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  /* Portal : ne se monte qu'après le premier rendu côté client */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* Prevent body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const distance = userPos
    ? haversineDistance(userPos.lat, userPos.lng, place.lat, place.lng)
    : null;

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-modal flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Détails – ${place.name}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm z-modal-backdrop animate-fade-in"
        onClick={onClose}
      />

      {/* Panel – bottom-sheet on mobile, centred modal on sm+ */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-xl sm:rounded-lg shadow-2xl max-h-[85vh] overflow-y-auto animate-slide-up z-modal">
        {/* Drag handle (mobile visual hint) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-[var(--gray-300)] rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-3 sm:right-3 w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--gray-100)] transition-colors text-[var(--gray-400)] hover:text-[var(--gray-600)]"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-6 pb-6 pt-2 sm:pt-6">
          {/* Type badge */}
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-semibold mb-3 bg-red-100 text-red-700"
          >
            {place.type === "verre" ? "PAV Verre" : "Déchèterie"}
          </span>

          <h2 className="text-xl font-bold text-[var(--gray-900)] mb-1">
            {place.name}
          </h2>
          {place.address && (
            <p className="text-[var(--gray-500)] text-sm mb-2">{place.address}</p>
          )}

          {/* Status (ouvert / remplissage) */}
          {place.status && (
            <p
              className={`text-sm font-medium mb-2 flex items-center gap-1.5 ${
                place.status === "Ouvert"
                  ? "text-green-700"
                  : "text-[var(--gray-600)]"
              }`}
            >
              {place.status === "Ouvert" ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {place.status}
            </p>
          )}

          {/* Distance badge */}
          {distance !== null && (
            <p className="text-sm text-[var(--mel-red)] font-medium mb-4 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              À {formatDistance(distance)} de vous
            </p>
          )}

          {/* Horaires (déchèteries) */}
          {place.hours && (
            <div className="mb-3">
              <span className="text-xs font-bold text-[var(--gray-400)] uppercase tracking-wider">
                Horaires
              </span>
              <p className="text-sm text-[var(--gray-700)] mt-0.5">{place.hours}</p>
            </div>
          )}

          {/* Notes */}
          {place.notes && (
            <div className="mb-5">
              <span className="text-xs font-bold text-[var(--gray-400)] uppercase tracking-wider">
                Notes
              </span>
              <p className="text-sm text-[var(--gray-700)] mt-0.5">{place.notes}</p>
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
              className="btn btn-primary w-full justify-center py-3"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Voir l'itinéraire
            </a>
          )}

          {/* Secondary action – locate on map */}
          <a
            href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}#map=15/${place.lat}/${place.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-secondary w-full justify-center py-2.5 text-sm ${
              userPos ? "mt-2" : ""
            }`}
          >
            Voir sur la carte
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
