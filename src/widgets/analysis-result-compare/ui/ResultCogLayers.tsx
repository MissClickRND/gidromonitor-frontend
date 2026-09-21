import type { ResultLayer } from "@/pages/analysis-result/model/layers";
import { Layer, Source } from "react-map-gl/maplibre";
import { configureCogRendering } from "../lib/configureCogRendering";

type ResultCogLayersProps = {
  layers: ResultLayer[];
};

function toCogUrl(sourceUrl: string) {
  return `cog://${new URL(sourceUrl, window.location.origin).href}`;
}

export default function ResultCogLayers({ layers }: ResultCogLayersProps) {
  const visibleLayers = layers.filter((layer) => layer.sourceUrl);
  visibleLayers.forEach(configureCogRendering);

  return visibleLayers.map((layer) => {
    const styleKey = JSON.stringify({ url: layer.sourceUrl, color: layer.color, style: layer.cogStyle });

    return (
      <Source
        key={`${layer.id}-${styleKey}`}
        id={`result-cog-source-${layer.id}`}
        type="raster"
        url={toCogUrl(layer.sourceUrl as string)}
        tileSize={256}
      >
        <Layer
          id={`result-cog-layer-${layer.id}`}
          type="raster"
          paint={{ "raster-opacity": layer.opacity ?? 1 }}
        />
      </Source>
    );
  });
}
