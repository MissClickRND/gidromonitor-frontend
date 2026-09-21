import { setColorFunction } from "@geomatico/maplibre-cog-protocol";
import type { CogStyle, ResultLayer } from "@/pages/analysis-result/model/layers";

const configuredStyles = new Map<string, string>();

function getAbsoluteUrl(sourceUrl: string) {
  return new URL(sourceUrl, window.location.origin).href;
}

function parseHexColor(color: string): [number, number, number] {
  const value = Number.parseInt(color.replace("#", ""), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function stretch(value: number, [minimum, maximum]: readonly [number, number]) {
  if (!Number.isFinite(value)) return 0;
  return Math.round(255 * Math.max(0, Math.min(1, (value - minimum) / (maximum - minimum))));
}

function createColorFunction(style: CogStyle, tint: [number, number, number]) {
  if (style.type === "rgb") {
    return (pixel: ArrayLike<number>, outputColor: Uint8ClampedArray) => {
      const [redBand, greenBand, blueBand] = style.bands;
      const red = pixel[redBand];
      const green = pixel[greenBand];
      const blue = pixel[blueBand];
      const isEmpty = style.transparentWhenRgbZero && red === 0 && green === 0 && blue === 0;
      const isInvalid = !Number.isFinite(red) || !Number.isFinite(green) || !Number.isFinite(blue);

      if (isEmpty || isInvalid) {
        outputColor.set([0, 0, 0, 0]);
        return;
      }

      outputColor.set([
        stretch(red, style.ranges[0]),
        stretch(green, style.ranges[1]),
        stretch(blue, style.ranges[2]),
        255,
      ]);
    };
  }

  return (pixel: ArrayLike<number>, outputColor: Uint8ClampedArray) => {
    const value = pixel[style.band];
    if (!Number.isFinite(value) || (style.transparentWhenZero && value === 0)) {
      outputColor.set([0, 0, 0, 0]);
      return;
    }

    const intensity = stretch(value, style.range) / 255;
    outputColor.set([
      Math.round(tint[0] * intensity),
      Math.round(tint[1] * intensity),
      Math.round(tint[2] * intensity),
      255,
    ]);
  };
}

export function configureCogRendering(layer: ResultLayer) {
  if (!layer.sourceUrl || !layer.cogStyle) return;

  const sourceUrl = getAbsoluteUrl(layer.sourceUrl);
  const styleKey = JSON.stringify({ color: layer.color, style: layer.cogStyle });
  if (configuredStyles.get(sourceUrl) === styleKey) return;

  setColorFunction(sourceUrl, createColorFunction(layer.cogStyle, parseHexColor(layer.color)));
  configuredStyles.set(sourceUrl, styleKey);
}
