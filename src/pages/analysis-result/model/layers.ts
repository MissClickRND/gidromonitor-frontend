export type CogStyle =
  | {
      type: "rgb";
      bands: readonly [number, number, number];
      ranges: readonly [readonly [number, number], readonly [number, number], readonly [number, number]];
      transparentWhenRgbZero?: boolean;
    }
  | {
      type: "single-band";
      band: number;
      range: readonly [number, number];
      transparentWhenZero?: boolean;
    };

export type ResultLayer = {
  id: string;
  label: string;
  color: string;
  sourceUrl?: string;
  group: "water" | "satellite";
  opacity?: number;
  cogStyle?: CogStyle;
};

export const localCogPreviewLayer: ResultLayer = {
  id: "local-cog-preview",
  label: "Предпросмотр результата",
  color: "#2267a9",
  sourceUrl: "/test.tif",
  group: "water",
  opacity: 1,
  cogStyle: {
    type: "rgb",
    bands: [0, 1, 2],
    ranges: [[0, 22], [0, 83], [0, 98]],
    transparentWhenRgbZero: true,
  },
};

export const resultLayers: ResultLayer[] = [
  { id: "water-before", label: "Вода до события", color: "#7eacc8", group: "water", opacity: 0.72 },
  { id: "water-peak", label: "Вода на пике", color: "#2267a9", group: "water", opacity: 0.72 },
  { id: "new-flooding", label: "Новое затопление", color: "#e99a3f", group: "water", opacity: 0.72 },
  { id: "water-decrease", label: "Убыль воды", color: "#8274b6", group: "water", opacity: 0.72 },
  { id: "sentinel-1", label: "Sentinel-1 (SAR)", color: "#46849f", group: "satellite", opacity: 0.72 },
  { id: "sentinel-2", label: "Sentinel-2 (MSI)", color: "#9cc6d8", group: "satellite", opacity: 0.72 },
];
