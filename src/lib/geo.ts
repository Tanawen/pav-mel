/* ── Types ──────────────────────────────────────────────────────────── */

export interface PointMEL {
  id: number;
  name: string;
  type: "verre" | "decheterie";
  address: string;
  lat: number;
  lng: number;
  hours?: string;
  notes?: string;
}

export interface PointWithDistance extends PointMEL {
  distance: number; // km
}

/* ── Constants ──────────────────────────────────────────────────────── */

/** Approximate centre of the MEL territory */
export const MEL_CENTER: [number, number] = [50.6292, 3.0573];

/** Predefined communes with coordinates for the fallback search */
export const COMMUNES: { name: string; lat: number; lng: number }[] = [
  { name: "Lille", lat: 50.6292, lng: 3.0573 },
  { name: "Roubaix", lat: 50.6912, lng: 3.1754 },
  { name: "Tourcoing", lat: 50.7204, lng: 3.1513 },
  { name: "Villeneuve-d'Ascq", lat: 50.6569, lng: 3.1203 },
  { name: "Marcq-en-Barœul", lat: 50.6772, lng: 3.0793 },
  { name: "Wattrelos", lat: 50.704, lng: 3.2178 },
  { name: "Loos", lat: 50.607, lng: 3.058 },
  { name: "Hellemmes", lat: 50.628, lng: 3.105 },
  { name: "Lambersart", lat: 50.6385, lng: 3.0315 },
  { name: "La Chapelle-d'Alexandre", lat: 50.61, lng: 3.12 },
];

/* ── Haversine ──────────────────────────────────────────────────────── */

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

/**
 * Great-circle distance (km) between two lat/lng pairs (Haversine formula).
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6_371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ── Formatting ─────────────────────────────────────────────────────── */

/** Human-readable distance: metres below 1 km, otherwise km with one decimal. */
export function formatDistance(km: number): string {
  return km < 1 ? `${Math.round(km * 1_000)} m` : `${km.toFixed(1)} km`;
}

/* ── Directions URL ─────────────────────────────────────────────────── */

/** OpenStreetMap directions deep-link (no API key needed). */
export function getDirectionsUrl(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number
): string {
  return `https://www.openstreetmap.org/directions?from=${fromLat},${fromLng}&to=${toLat},${toLng}`;
}

/* ── Nominatim geocode ──────────────────────────────────────────────── */

/**
 * Free-text geocode via Nominatim (OSM).
 * No API key required – called at most once per explicit user action (fair-use).
 * Returns null on any error or when no result is found.
 */
export async function geocodeAddress(
  query: string
): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", `${query}, Métropole Européenne de Lille`);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");
    url.searchParams.set("countrycodes", "fr");

    const res = await fetch(url.toString());
    if (!res.ok) return null;

    const data: Array<{ lat: string; lon: string }> = await res.json();
    if (!data.length) return null;

    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}
