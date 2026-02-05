/**
 * Données des points MEL (version mock avec 17 points).
 * Utilise les données statiques pour une meilleure performance.
 */

import type { PointMEL } from "./geo";
import mockRaw from "@/data/points-mel.json";

/**
 * Charge les points depuis les données mock.
 * 12 PAV verre + 5 déchèteries = 17 points au total.
 */
export async function loadPoints(): Promise<PointMEL[]> {
  return (mockRaw as Array<Record<string, unknown>>).map((p) => ({
    id: String(p.id),
    type: p.type as "verre" | "decheterie",
    name: String(p.name),
    address: String(p.address ?? ""),
    hours: p.hours ? String(p.hours) : undefined,
    notes: p.notes ? String(p.notes) : undefined,
    lat: Number(p.lat),
    lng: Number(p.lng),
  }));
}

/** Placeholder pour compatibilité (pas de cache utilisé). */
export function invalidateCache() {
  // Pas de cache à invalider avec les données mock
}
