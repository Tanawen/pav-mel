/**
 * Autocomplétion + géocodage via l'API BAN (Base Adresse Nationale).
 * Service officiel français – gratuit, sans clé API.
 * Les coordonnées sont utilisées uniquement côté navigateur pour le calcul
 * de distance ; rien n'est transmis à nos serveurs (RGPD).
 *
 * Docs : https://api-adresse.data.gouv.fr/search
 */

export interface AddressSuggestion {
  id: string;
  label: string;
  lat: number;
  lng: number;
}

const BAN_URL = "https://api-adresse.data.gouv.fr/search";

/** Bounding-box couvrant le territoire MEL (lat/lng). */
const MEL_BBOX = "2.75,50.40,3.45,50.95";

/**
 * Recherche d'adresses dans le périmètre MEL.
 * Retourne un tableau vide en cas d'erreur réseau ou aucun résultat.
 * Accepte un AbortSignal pour annuler une requête en cours.
 */
export async function searchAddresses(
  query: string,
  signal?: AbortSignal
): Promise<AddressSuggestion[]> {
  if (!query.trim()) return [];

  const url = new URL(BAN_URL);
  url.searchParams.set("q", query);
  url.searchParams.set("rows", "6");
  url.searchParams.set("bbox", MEL_BBOX);

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) return [];

  const data: {
    features?: Array<{
      properties: { id: string; label: string };
      geometry: { coordinates: [number, number] }; // [lng, lat]
    }>;
  } = await res.json();

  return (data.features ?? []).map((f) => ({
    id: f.properties.id,
    label: f.properties.label,
    lat: f.geometry.coordinates[1],
    lng: f.geometry.coordinates[0],
  }));
}
