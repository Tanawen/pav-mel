/* ── Types ──────────────────────────────────────────────────────────── */

export interface PointMEL {
  id: string;
  name: string;
  type: "verre" | "decheterie";
  address?: string;
  lat: number;
  lng: number;
  hours?: string;
  notes?: string;
  status?: string;
  raw?: Record<string, unknown>;
}

export interface PointWithDistance extends PointMEL {
  distance: number; // km
}

/* ── Constants ──────────────────────────────────────────────────────── */

/** Approximate centre of the MEL territory */
export const MEL_CENTER: [number, number] = [50.6292, 3.0573];

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

