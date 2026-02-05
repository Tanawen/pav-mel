/**
 * Téléchargement, normalisation et cache (localStorage, TTL 24 h) des données
 * officielles MEL via OGC API Features.
 *
 * PAV verre       → environnement_energie:pav_etat_parc   (3 600+ features)
 * Déchèteries     → environnement_energie:decheterie_fixe (13 features)
 *
 * Stratégie de chargement :  cache localStorage → API OGC → fallback mock.
 */

import type { PointMEL } from "./geo";
import mockRaw from "@/data/points-mel.json";

/* ── Endpoints ─────────────────────────────────────────────────────── */

const PAV_URL =
  "https://data.lillemetropole.fr/data/ogcapi/collections/environnement_energie:pav_etat_parc/items";
const DECH_URL =
  "https://data.lillemetropole.fr/data/ogcapi/collections/environnement_energie:decheterie_fixe/items";

/* ── Cache ─────────────────────────────────────────────────────────── */

const CACHE_KEY = "pav-mel:opendata:v2";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 h

interface CacheEntry {
  ts: number;
  data: PointMEL[];
}

function readCache(): PointMEL[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.ts > CACHE_TTL_MS) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache(data: PointMEL[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    /* localStorage plein ou indisponible – on continue sans cache */
  }
}

/* ── PAV fetcher ───────────────────────────────────────────────────── */

/**
 * Récupère tous les PAV de type VERRE avec pagination (500 par page).
 * Déduplique par identifiant_pav.
 */
async function fetchPAV(): Promise<PointMEL[]> {
  const results: PointMEL[] = [];
  const seen = new Set<string>();
  let offset = 0;
  const PAGE = 500;
  let fetched: Record<string, unknown>[];

  do {
    const url = new URL(PAV_URL);
    url.searchParams.set("f", "json");
    url.searchParams.set("limit", String(PAGE));
    url.searchParams.set("offset", String(offset));

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`PAV ${res.status}`);

    const body: { records?: Record<string, unknown>[] } = await res.json();
    fetched = body.records ?? [];

    for (const r of fetched) {
      if (String(r.type_flux).toUpperCase() !== "VERRE") continue;

      const id = String(r.identifiant_pav ?? r["@id"] ?? "");
      if (!id || seen.has(id)) continue;
      seen.add(id);

      const lat = Number(r.latitude_emplacement);
      const lng = Number(r.longitude_emplacement);
      if (isNaN(lat) || isNaN(lng)) continue;

      const adresse = String(r.adresse ?? "");
      const commune = String(r.commune ?? "");
      const fillLevel = Number(r.dernier_niveau_remplissage);

      results.push({
        id,
        type: "verre",
        name: `PAV Verre – ${adresse || commune}`,
        address: [adresse, r.code_postal, commune].filter(Boolean).join(", "),
        lat,
        lng,
        notes: fillLevel >= 0 ? `Remplissage : ${fillLevel}%` : undefined,
        raw: r,
      });
    }

    offset += PAGE;
  } while (fetched.length >= PAGE && offset <= 10_000);

  return results;
}

/* ── Déchèteries fetcher ───────────────────────────────────────────── */

/**
 * Récupère les 13 déchèteries fixes.
 * Dans ce dataset : x = latitude, y = longitude.
 */
async function fetchDecheteries(): Promise<PointMEL[]> {
  const url = new URL(DECH_URL);
  url.searchParams.set("f", "json");
  url.searchParams.set("limit", "50");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Déchèteries ${res.status}`);

  const body: { records?: Record<string, unknown>[] } = await res.json();

  return (body.records ?? [])
    .map((r): PointMEL | null => {
      const lat = Number(r.x);
      const lng = Number(r.y);
      if (isNaN(lat) || isNaN(lng)) return null;

      return {
        id: String(r["@id"] ?? ""),
        type: "decheterie",
        name: String(r.nom ?? "Déchèterie"),
        address: String(r.adresse_ban ?? r.adresse_precision ?? ""),
        hours: String(r.information ?? "").replace(/\r\n/g, " ").trim() || undefined,
        status: String(r.is_ouvert ?? ""),
        lat,
        lng,
        raw: r,
      };
    })
    .filter((p): p is PointMEL => p !== null);
}

/* ── Mock fallback ─────────────────────────────────────────────────── */

function getMock(): PointMEL[] {
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

/* ── Public ────────────────────────────────────────────────────────── */

/**
 * Charge les points : cache localStorage → API OGC → mock.
 * Doit être appelée côté client uniquement.
 */
export async function loadPoints(): Promise<PointMEL[]> {
  if (typeof window !== "undefined") {
    const cached = readCache();
    if (cached) return cached;
  }

  try {
    const [pav, dech] = await Promise.all([fetchPAV(), fetchDecheteries()]);
    const all = [...pav, ...dech];
    if (typeof window !== "undefined") writeCache(all);
    return all;
  } catch {
    return getMock();
  }
}

/** Vide le cache pour forcer un rechargement depuis l'API. */
export function invalidateCache() {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch {
      /* noop */
    }
  }
}
