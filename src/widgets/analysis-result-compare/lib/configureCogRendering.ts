import { setColorFunction } from "@geomatico/maplibre-cog-protocol";
import { analysisBands, type ResultLayer } from "@/pages/analysis-result/model/layers";
import { resolveCogUrl } from "./resolveCogUrl";

const configuredStyles = new Map<string, string>();

function stretch(value: number, [minimum, maximum]: readonly [number, number]) {
  return Math.max(0, Math.min(1, (value - minimum) / (maximum - minimum)));
}

function parseColor(color: string): [number, number, number] {
  const value = Number.parseInt(color.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function renderBase(pixel: ArrayLike<number>, output: Uint8ClampedArray) {
  const hand = pixel[0];
  const ndvi = pixel[1];
  const ndwi = pixel[2];
  if (![hand, ndvi, ndwi].every(Number.isFinite)) {
    output.set([0, 0, 0, 0]);
    return;
  }

  output.set([
    Math.round(stretch(ndwi, analysisBands[2].range) * 255),
    Math.round(stretch(ndvi, analysisBands[1].range) * 255),
    Math.round(stretch(hand, analysisBands[0].range) * 255),
    220,
  ]);
}

export function configureCogRendering(sourceUrl: string, activeLayers: ResultLayer[]) {
  const absoluteUrl = resolveCogUrl(sourceUrl);
  const styleKey = activeLayers.map((layer) => layer.id).join(",") || "base";
  if (configuredStyles.get(absoluteUrl) === styleKey) return;
  const selectedBands = activeLayers.map((layer) => ({
    band: layer.band,
    range: layer.range,
    color: parseColor(layer.color),
  }));

  setColorFunction(absoluteUrl, (pixel, output) => {
    if (!selectedBands.length) {
      renderBase(pixel, output);
      return;
    }

    let red = 0;
    let green = 0;
    let blue = 0;
    let contributors = 0;
    for (const layer of selectedBands) {
      const value = pixel[layer.band];
      if (!Number.isFinite(value)) continue;
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
      225,
    ]);
  });
  configuredStyles.set(absoluteUrl, styleKey);
}
