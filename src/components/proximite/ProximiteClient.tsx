"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import pointsData from "@/data/points-mel.json";
import {
  type PointMEL,
  type PointWithDistance,
  haversineDistance,
  COMMUNES,
  geocodeAddress,
  MEL_CENTER,
} from "@/lib/geo";
import Filters, { type FilterType } from "./Filters";
import NearbyList from "./NearbyList";
import PlaceDrawer from "./PlaceDrawer";

/* ── Lazy-load Leaflet map (requires window – no SSR) ───────────────── */
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-3xl mb-2 animate-pulse" aria-hidden="true">🗺️</div>
        <p className="text-gray-500 text-sm">Chargement de la carte…</p>
      </div>
    </div>
  ),
});

type GeoStatus = "idle" | "pending" | "denied" | "unavailable";

export default function ProximiteClient() {
  const places = pointsData as PointMEL[];
  const searchParams = useSearchParams();

  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [filter, setFilter] = useState<FilterType>(() => {
    const param = searchParams.get("filter");
    if (param === "verre" || param === "decheterie") return param;
    return "all";
  });
  const [selectedPlace, setSelectedPlace] = useState<PointMEL | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mapCentre, setMapCentre] = useState<[number, number]>(MEL_CENTER);
  const [geocodeWarning, setGeocodeWarning] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  /* ── Click-outside closes commune dropdown ─────────────────────────── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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
      .slice(0, 5);
  }, [filteredPlaces, userPos]);

  const communeSuggestions = useMemo(() => {
    if (!search.trim()) return COMMUNES.slice(0, 6);
    return COMMUNES.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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

  const handleSearch = useCallback(async () => {
    const q = search.trim();
    if (!q) return;

    // Exact commune match first
    const commune = COMMUNES.find(
      (c) => c.name.toLowerCase() === q.toLowerCase()
    );
    if (commune) {
      applyPosition(commune.lat, commune.lng);
      setSearch("");
      setShowDropdown(false);
      return;
    }

    // Nominatim fallback
    setIsSearching(true);
    setGeocodeWarning(true);
    const result = await geocodeAddress(q);
    setIsSearching(false);
    if (result) {
      applyPosition(result.lat, result.lng);
      setSearch("");
      setShowDropdown(false);
    }
    // if null the input stays so the user can edit
  }, [search, applyPosition]);

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Controls header ─────────────────────────────────────────── */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
          {/* Title block */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Trouver un point de dépôt près de chez moi
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Autorisez la géolocalisation pour calculer la distance.{" "}
              <span className="italic">
                Votre position n&apos;est pas stockée.
              </span>
            </p>
          </div>

          {/* Location row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Geolocation button */}
            <button
              type="button"
              onClick={handleGeolocate}
              disabled={geoStatus === "pending"}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-60 transition-colors shrink-0"
            >
              <span aria-hidden="true">
                {geoStatus === "pending" ? "⏳" : "📍"}
              </span>
              {geoStatus === "pending" ? "En cours…" : "Utiliser ma position"}
            </button>

            {/* Search input + commune autocomplete */}
            <div className="relative flex-1" ref={searchContainerRef}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Commune ou adresse…"
                  aria-label="Rechercher une commune ou adresse"
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={isSearching || !search.trim()}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-colors shrink-0"
                >
                  {isSearching ? "…" : "Rechercher"}
                </button>
              </div>

              {/* Commune suggestions dropdown */}
              {showDropdown && communeSuggestions.length > 0 && (
                <ul
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto"
                  role="listbox"
                  aria-label="Communes suggérées"
                >
                  {communeSuggestions.map((c) => (
                    <li
                      key={c.name}
                      role="option"
                      aria-selected={false}
                      className="px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 cursor-pointer transition-colors flex items-center gap-2"
                      onMouseDown={(e) => {
                        e.preventDefault(); // prevent input blur before selection
                        applyPosition(c.lat, c.lng);
                        setSearch("");
                        setShowDropdown(false);
                      }}
                    >
                      <span aria-hidden="true">📍</span>
                      {c.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Status / warning banners */}
          {geoStatus === "denied" && (
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
              La géolocalisation a été refusée. Utilisez la recherche par commune ci-dessus.
            </p>
          )}
          {geoStatus === "unavailable" && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              La géolocalisation n&apos;est pas disponible sur votre navigateur.
            </p>
          )}
          {geocodeWarning && (
            <p className="text-xs text-gray-400 italic">
              La recherche par adresse utilise le service externe Nominatim (OpenStreetMap) – données illustratives.
            </p>
          )}

          {/* Type filters */}
          <Filters filter={filter} onChange={setFilter} />
        </div>
      </section>

      {/* ── Map + Nearby list ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map panel */}
          <div className="flex-1 h-64 sm:h-96 lg:h-[520px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <MapView
              points={filteredPlaces}
              userPos={userPos}
              centre={mapCentre}
              onPlaceClick={setSelectedPlace}
            />
          </div>

          {/* Nearby list panel */}
          <div className="w-full lg:w-80 lg:max-h-[520px] lg:overflow-y-auto">
            {userPos ? (
              <NearbyList
                places={nearbyPlaces}
                userPos={userPos}
                onPlaceClick={setSelectedPlace}
              />
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                <span className="text-3xl block mb-3" aria-hidden="true">📍</span>
                <p className="text-sm text-gray-500">
                  Utilisez la géolocalisation ou recherchez une commune pour
                  voir les points les plus proches.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Legend ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex gap-5 flex-wrap text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 rounded-full bg-emerald-500" />
            PAV Verre
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 rounded-full bg-amber-500" />
            Déchèterie
          </span>
          {userPos && (
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-200" />
              Votre position
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-3 italic">
          Prototype – données illustratives uniquement. Les coordonnées sont approximatives.
        </p>
      </div>

      {/* ── Place detail drawer ───────────────────────────────────── */}
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
