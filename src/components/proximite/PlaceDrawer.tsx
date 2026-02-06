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
  const [showNotifForm, setShowNotifForm] = useState(false);
  const [notifMethod, setNotifMethod] = useState<"email" | "sms">("email");
  const [notifEmail, setNotifEmail] = useState("");
  const [notifPhone, setNotifPhone] = useState("");
  const [notifSubmitted, setNotifSubmitted] = useState(false);
  const [notifError, setNotifError] = useState("");

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

          {/* ── Notification subscription section ──────────────────────── */}
          <div className="mt-6 pt-5 border-t border-[var(--gray-200)]">
            <button
              type="button"
              onClick={() => setShowNotifForm(!showNotifForm)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--mel-red-light)] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--mel-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-[var(--gray-900)] text-sm">Recevoir une notification</span>
                  <p className="text-xs text-[var(--gray-500)]">Soyez alerté des passages de collecte</p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-[var(--gray-400)] transition-transform ${showNotifForm ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showNotifForm && (
              <div className="mt-4 animate-fade-in">
                {notifSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-semibold text-green-800">Inscription enregistrée</p>
                    <p className="text-sm text-green-700 mt-1">
                      Vous recevrez une notification avant chaque passage de collecte.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setNotifError("");
                      if (notifMethod === "email" && !notifEmail) {
                        setNotifError("Veuillez entrer une adresse email.");
                        return;
                      }
                      if (notifMethod === "sms" && !notifPhone) {
                        setNotifError("Veuillez entrer un numéro de téléphone.");
                        return;
                      }
                      // Simulate API call
                      setNotifSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    {/* Method toggle */}
                    <div className="flex gap-2 p-1 bg-[var(--gray-100)] rounded-lg">
                      <button
                        type="button"
                        onClick={() => setNotifMethod("email")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                          notifMethod === "email"
                            ? "bg-white text-[var(--mel-red)] shadow-sm"
                            : "text-[var(--gray-600)] hover:text-[var(--gray-900)]"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setNotifMethod("sms")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                          notifMethod === "sms"
                            ? "bg-white text-[var(--mel-red)] shadow-sm"
                            : "text-[var(--gray-600)] hover:text-[var(--gray-900)]"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        SMS
                      </button>
                    </div>

                    {/* Input field */}
                    {notifMethod === "email" ? (
                      <div>
                        <label htmlFor="notif-email" className="block text-xs font-medium text-[var(--gray-700)] mb-1">
                          Adresse email
                        </label>
                        <input
                          type="email"
                          id="notif-email"
                          value={notifEmail}
                          onChange={(e) => setNotifEmail(e.target.value)}
                          placeholder="votre@email.fr"
                          className="w-full px-3 py-2.5 border border-[var(--gray-200)] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--mel-red)] focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="notif-phone" className="block text-xs font-medium text-[var(--gray-700)] mb-1">
                          Numéro de téléphone
                        </label>
                        <input
                          type="tel"
                          id="notif-phone"
                          value={notifPhone}
                          onChange={(e) => setNotifPhone(e.target.value)}
                          placeholder="06 12 34 56 78"
                          className="w-full px-3 py-2.5 border border-[var(--gray-200)] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--mel-red)] focus:border-transparent"
                        />
                      </div>
                    )}

                    {/* Collection types info */}
                    <div className="bg-[var(--gray-50)] rounded-lg p-3">
                      <p className="text-xs font-medium text-[var(--gray-700)] mb-2">Types de collecte disponibles :</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">Tri sélectif</span>
                        <span className="inline-flex items-center px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium">Ordures ménagères</span>
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Verre</span>
                        <span className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-medium">Biodéchets</span>
                      </div>
                    </div>

                    {/* Error message */}
                    {notifError && (
                      <p className="text-sm text-red-600 flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {notifError}
                      </p>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="btn btn-primary w-full justify-center py-2.5"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      S'inscrire aux alertes
                    </button>

                    <p className="text-xs text-[var(--gray-400)] text-center">
                      Vous pouvez vous désinscrire à tout moment.
                    </p>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
