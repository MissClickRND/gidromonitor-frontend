import type { Coordinate } from "@/features/create-analysis";
import { cityOptions } from "./cities";

export type CitySearchResult = {
  name: string;
  coordinates: Coordinate;
};

type MapTilerFeature = {
  text?: string;
  place_name?: string;
  center?: unknown;
  geometry?: { coordinates?: unknown };
};

type MapTilerResponse = {
  features?: MapTilerFeature[];
};

function isCoordinate(value: unknown): value is Coordinate {
  return (
    Array.isArray(value) &&
    value.length >= 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  );
}

export async function geocodeCity(query: string): Promise<CitySearchResult | null> {
  const normalizedQuery = query.trim().toLocaleLowerCase("ru");
  const localMatch = cityOptions.find((option) =>
    option.name.toLocaleLowerCase("ru").startsWith(normalizedQuery),
  );
  if (localMatch) return localMatch;

  const styleUrl = import.meta.env.VITE_MAP_STYLE_URL;
  if (!styleUrl || !normalizedQuery) return null;

  try {
    const apiKey = new URL(styleUrl).searchParams.get("key");
    if (!apiKey) return null;

    const response = await fetch(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(query.trim())}.json?key=${encodeURIComponent(apiKey)}&language=ru&limit=1`,
    );
    if (!response.ok) return null;

    const data = (await response.json()) as MapTilerResponse;
    const feature = data.features?.[0];
    const coordinates = feature?.center ?? feature?.geometry?.coordinates;
    if (!feature || !isCoordinate(coordinates)) return null;

    return {
      name: feature.text ?? feature.place_name ?? query.trim(),
      coordinates: [coordinates[0], coordinates[1]],
    };
  } catch {
    return null;
  }
}
