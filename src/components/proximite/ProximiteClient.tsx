"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  type PointMEL,
  type PointWithDistance,
  haversineDistance,
  MEL_CENTER,
} from "@/lib/geo";
import { searchAddresses, type AddressSuggestion } from "@/lib/geocode";
import { loadPoints } from "@/lib/opendata";
import Filters, { type FilterType } from "./Filters";
import NearbyList from "./NearbyList";
import PlaceDrawer from "./PlaceDrawer";

/* ── Lazy-load Leaflet map (requires window – no SSR) ───────────────── */
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[var(--gray-100)] flex items-center justify-center">
      <div className="text-center">
        <div className="text-3xl mb-2 animate-pulse" aria-hidden="true">🗺️</div>
        <p className="text-[var(--gray-500)] text-sm">Chargement de la carte…</p>
      </div>
    </div>
  ),
});

type GeoStatus = "idle" | "pending" | "denied" | "unavailable";

export default function ProximiteClient() {
  const searchParams = useSearchParams();

  /* ── Données open data (cache → API → mock) ────────────────────────── */
  const [places, setPlaces] = useState<PointMEL[]>([]);
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadPoints().then((data) => {
      if (!cancelled) {
        setPlaces(data);
        setDataReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /* ── UI state ───────────────────────────────────────────────────────── */
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [filter, setFilter] = useState<FilterType>(() => {
    const param = searchParams.get("filter");
    if (param === "verre" || param === "decheterie") return param;
    return "all";
  });
  const [selectedPlace, setSelectedPlace] = useState<PointMEL | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
  const [mapCentre, setMapCentre] = useState<[number, number]>(MEL_CENTER);

  /* ── Autocomplete state ─────────────────────────────────────────────── */
  const [addressInput, setAddressInput] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Click-outside ferme le dropdown ────────────────────────────────── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Nettoyage des refs à l'unmount ─────────────────────────────────── */
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  /* ── Derived state ──────────────────────────────────────────────────── */
  const filteredPlaces = useMemo(() => {
    if (filter === "all") return places;
    return places.filter((p) => p.type === filter);
  }, [places, filter]);

  const nearbyPlaces: PointWithDistance[] = useMemo(() => {
    if (!userPos) return [];
    return filteredPlaces
      .map((p) => ({
        ...p,
        distance: haversineDistance(userPos.lat, userPos.lng, p.lat, p.lng),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);
  }, [filteredPlaces, userPos]);

  /* ── Handlers ───────────────────────────────────────────────────────── */
  const applyPosition = useCallback((lat: number, lng: number) => {
    setUserPos({ lat, lng });
    setMapCentre([lat, lng]);
  }, []);

  const handleGeolocate = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setGeoStatus("unavailable");
      return;
    }
    setGeoStatus("pending");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        applyPosition(pos.coords.latitude, pos.coords.longitude);
        setGeoStatus("idle");
      },
      () => setGeoStatus("denied"),
      { timeout: 10_000, maximumAge: 60_000 }
    );
  }, [applyPosition]);

  /** Déclenché à chaque keystroke : debounce 300 ms + AbortController. */
  const handleAddressInput = useCallback((value: string) => {
    setAddressInput(value);
    setSearchError(false);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setShowSuggestions(true);

    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const results = await searchAddresses(value, controller.signal);
        if (!controller.signal.aborted) {
          setSuggestions(results);
        }
      } catch (e) {
        if (!(e instanceof Error && e.name === "AbortError")) {
          setSuggestions([]);
        }
      }
    }, 300);
  }, []);

  /** Sélection d'une suggestion → centre la carte sur cette adresse. */
  const selectSuggestion = useCallback(
    (s: AddressSuggestion) => {
      applyPosition(s.lat, s.lng);
      setAddressInput(s.label);
      setSuggestions([]);
      setShowSuggestions(false);
    },
    [applyPosition]
  );

  /** Bouton "Rechercher" : utilise la 1ère suggestion ou relance une recherche. */
  const handleSearch = useCallback(async () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();

    const q = addressInput.trim();
    if (!q) return;

    if (suggestions.length > 0) {
      selectSuggestion(suggestions[0]);
      return;
    }

    setIsSearching(true);
    setSearchError(false);
    try {
      const results = await searchAddresses(q);
      if (results.length > 0) {
        selectSuggestion(results[0]);
      } else {
        setSearchError(true);
      }
    } catch {
      setSearchError(true);
    }
    setIsSearching(false);
  }, [addressInput, suggestions, selectSuggestion]);

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* ── Controls header ─────────────────────────────────────────── */}
      <section className="bg-white shadow-sm border-b border-[var(--gray-200)]">
        <div className="container-mel py-6 space-y-4">
          {/* Title + RGPD */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[var(--gray-900)]">
              Trouver un point de dépôt près de chez moi
            </h1>
            <p className="text-xs text-[var(--gray-400)] mt-1 italic">
              Adresse utilisée uniquement pour calculer la distance. Non stockée.
            </p>
          </div>

          {/* Address input + autocomplete + buttons */}
          <div className="relative" ref={containerRef}>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Input + suggestions dropdown */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={addressInput}
                  onChange={(e) => handleAddressInput(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Adresse complète…"
                  aria-label="Rechercher une adresse"
                  aria-autocomplete="list"
                  aria-expanded={showSuggestions && suggestions.length > 0}
                  className="w-full px-4 py-2.5 border border-[var(--gray-200)] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--mel-red)] focus:border-transparent"
                />

                {showSuggestions && suggestions.length > 0 && (
                  <ul
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--gray-200)] rounded-md shadow-lg z-dropdown max-h-52 overflow-y-auto"
                    role="listbox"
                    aria-label="Suggestions d'adresses"
                  >
                    {suggestions.map((s) => (
                      <li
                        key={s.id}
                        role="option"
                        aria-selected={false}
                        className="px-4 py-2.5 text-sm text-[var(--gray-700)] hover:bg-[var(--mel-red-light)] cursor-pointer transition-colors flex items-center gap-2"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          selectSuggestion(s);
                        }}
                      >
                        <span aria-hidden="true">📍</span>
                        {s.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Rechercher + Ma position */}
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={isSearching || !addressInput.trim()}
                  className="btn btn-primary"
                >
                  {isSearching ? "…" : "Rechercher"}
                </button>
                <button
                  type="button"
                  onClick={handleGeolocate}
                  disabled={geoStatus === "pending"}
                  className="btn btn-ghost"
                >
                  <span aria-hidden="true">
                    {geoStatus === "pending" ? "⏳" : "📍"}
                  </span>
                  {geoStatus === "pending" ? "En cours…" : "Ma position"}
                </button>
              </div>
            </div>
          </div>

          {/* Status / warning banners */}
          {searchError && (
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-4 py-2">
              Aucune adresse trouvée. Vérifiez votre saisie ou utilisez « Ma position ».
            </p>
          )}
          {geoStatus === "denied" && (
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-4 py-2">
              La géolocalisation a été refusée. Utilisez la recherche par adresse ci-dessus.
            </p>
          )}
          {geoStatus === "unavailable" && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-2">
              La géolocalisation n&apos;est pas disponible sur votre navigateur.
            </p>
          )}

          {/* Type filters */}
          <Filters filter={filter} onChange={setFilter} />
        </div>
      </section>

      {/* ── Map + Nearby list ──────────────────────────────────────── */}
      <div className="container-mel py-6">
        {!dataReady && (
          <p className="text-sm text-[var(--gray-500)] flex items-center gap-2 mb-3">
            <span className="animate-pulse">●</span>
            Chargement des données…
          </p>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map panel - bloc service style */}
          <div className="flex-1 bloc-service">
            <div className="h-64 sm:h-96 lg:h-[520px]">
              <MapView
                points={filteredPlaces}
                userPos={userPos}
                centre={mapCentre}
                onPlaceClick={setSelectedPlace}
              />
            </div>
          </div>

          {/* Nearby list panel – top 10 */}
          <div className="w-full lg:w-80 lg:max-h-[520px] lg:overflow-y-auto">
            {userPos && dataReady ? (
              <NearbyList
                places={nearbyPlaces}
                userPos={userPos}
                onPlaceClick={setSelectedPlace}
              />
            ) : (
              <div className="card-mel p-6 text-center">
                <span className="text-3xl block mb-3" aria-hidden="true">
                  {dataReady ? "📍" : "⏳"}
                </span>
                <p className="text-sm text-[var(--gray-500)]">
                  {dataReady
                    ? "Utilisez la géolocalisation ou recherchez une adresse pour voir les points les plus proches."
                    : "Chargement des données…"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Legend ──────────────────────────────────────────────────── */}
      <div className="container-mel pb-6">
        <div className="flex gap-5 flex-wrap text-sm text-[var(--gray-500)]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 rounded-full bg-red-500" />
            PAV Verre
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 rounded-full bg-red-400" />
            Déchèterie
          </span>
          {userPos && (
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full bg-[var(--mel-red)] ring-2 ring-[var(--mel-red-light)]" />
              Votre position
            </span>
          )}
        </div>
        {dataReady && (
          <p className="text-xs text-[var(--gray-400)] mt-2">
            {places.filter((p) => p.type === "verre").length} PAV verre ·{" "}
            {places.filter((p) => p.type === "decheterie").length} déchèteries ·
            données officielles MEL
          </p>
        )}
      </div>

      {/* ── Place detail drawer (z-index modal) ──────────────────── */}
      {selectedPlace && (
        <PlaceDrawer
          place={selectedPlace}
          userPos={userPos}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}
