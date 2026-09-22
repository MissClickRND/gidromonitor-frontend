import type { ResultLayer } from "@/pages/analysis-result/model/layers";
import { Layer, Source } from "react-map-gl/maplibre";
import { configureCogRendering } from "../lib/configureCogRendering";
import { resolveCogUrl } from "../lib/resolveCogUrl";

type ResultCogLayersProps = {
  sourceUrl: string;
  activeLayers: ResultLayer[];
};

export default function ResultCogLayers({
  sourceUrl,
  activeLayers,
}: ResultCogLayersProps) {
  if (!activeLayers.length) return null;

  configureCogRendering(sourceUrl, activeLayers);
  const styleKey = activeLayers.map((layer) => layer.id).join("-");
  const absoluteUrl = resolveCogUrl(sourceUrl);

  return (
    <Source
      key={`${absoluteUrl}-${styleKey}`}
      id="result-cog-source"
      type="raster"
      url={`cog://${absoluteUrl}#selection-${styleKey}`}
      tileSize={256}
    >
      <Layer
        id="result-cog-layer"
        type="raster"
        paint={{ "raster-opacity": 1 }}
      />
    </Source>
  );
}
