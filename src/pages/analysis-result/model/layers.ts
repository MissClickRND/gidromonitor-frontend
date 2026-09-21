export type BandSettings = {
  band: number;
  label: string;
  color: string;
  range: readonly [number, number];
};

export type ResultLayer = BandSettings & {
  id: string;
  sourceUrl: string;
};

// The nine bands and their order are part of the analysis COG contract.
export const analysisBands: readonly BandSettings[] = [
  { band: 0, label: "HAND", color: "#b9a16b", range: [0, 70] },
  { band: 1, label: "NDVI", color: "#48a45c", range: [-0.35, 0.7] },
  { band: 2, label: "NDWI", color: "#2589ca", range: [-0.65, 0.45] },
  { band: 3, label: "MNDWI", color: "#34b5d2", range: [-0.5, 0.9] },
  { band: 4, label: "AWEISH", color: "#6d8ed7", range: [-0.75, 1.4] },
  { band: 5, label: "SLOPE", color: "#ca9c57", range: [0, 55] },
  { band: 6, label: "VV_VH", color: "#9f77c9", range: [-8, 35] },
  { band: 7, label: "OCCURRENCE", color: "#2068a0", range: [0, 100] },
  { band: 8, label: "SEASONALITY", color: "#3f9b99", range: [0, 12] },
];

export function createResultLayers(sourceUrl: string): ResultLayer[] {
  return analysisBands.map((band) => ({
    ...band,
    id: `band-${band.band}`,
    sourceUrl,
  }));
}
