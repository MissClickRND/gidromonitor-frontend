import { setColorFunction } from "@geomatico/maplibre-cog-protocol";
import type { ResultLayer } from "@/pages/analysis-result/model/layers";
import { resolveCogUrl } from "./resolveCogUrl";

const configuredStyles = new Map<string, string>();

function stretch(value: number, [minimum, maximum]: readonly [number, number]) {
  return Math.max(0, Math.min(1, (value - minimum) / (maximum - minimum)));
}

function parseColor(color: string): [number, number, number] {
  const value = Number.parseInt(color.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export function configureCogRendering(
  sourceUrl: string,
  activeLayers: ResultLayer[],
) {
  const absoluteUrl = resolveCogUrl(sourceUrl);
  const styleKey = activeLayers.map((layer) => layer.id).join(",");
  if (configuredStyles.get(absoluteUrl) === styleKey) return;
  const selectedBands = activeLayers.map((layer) => ({
    band: layer.band,
    range: layer.range,
    color: parseColor(layer.color),
    waterOnly: layer.band === 7 || layer.band === 8,
  }));

  setColorFunction(absoluteUrl, (pixel, output) => {
    let red = 0;
    let green = 0;
    let blue = 0;
    let contributors = 0;
    for (const layer of selectedBands) {
      const value = pixel[layer.band];
      if (!Number.isFinite(value) || (layer.waterOnly && value <= 1)) continue;
      const intensity = stretch(value, layer.range);
      const [r, g, b] = layer.color;
      red += r * intensity;
      green += g * intensity;
      blue += b * intensity;
      contributors++;
    }

    if (!contributors) {
      output.set([0, 0, 0, 0]);
      return;
    }
    output.set([
      Math.round(red / contributors),
      Math.round(green / contributors),
      Math.round(blue / contributors),
      255,
    ]);
  });
  configuredStyles.set(absoluteUrl, styleKey);
}
