import { useArea } from "@/entities/areas";
import { useLayersById } from "@/entities/analysis";
import { useMemo, useState } from "react";
import { Center, Stack, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import { LoaderLogo } from "@/shared/ui/loader-logo";
import { AnalysisResultCompare } from "@/widgets/analysis-result-compare";
import { AnalysisResultHeader } from "@/widgets/analysis-result-header";
import { ResultLayersSection } from "./sections/ResultLayersSection";
import { ResultStatsSection } from "./sections/ResultStatsSection";
import { createResultLayers } from "../model/layers";
import styles from "./AnalysisResult.page.module.css";

export default function AnalysisResultPage() {
  const [streetsView, setStreetsView] = useState(false);
  const [activeLayerIds, setActiveLayerIds] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const { data: area, isPending, isError } = useArea(id);
  const { data: layerData, isPending: layersPending } = useLayersById(id);
  const sourceUrl = layerData?.files[0]?.url ||
    (import.meta.env.DEV ? "/merged_20260921_211153_cog.tif" : null);
  const layers = useMemo(
    () => sourceUrl ? createResultLayers(sourceUrl) : [],
    [sourceUrl],
  );

  if (isPending || layersPending) {
    return (
      <main className={styles.page}>
        <Center h="100svh"><LoaderLogo size={96} label="Загрузка результата анализа" /></Center>
      </main>
    );
  }

  if (isError || !area || !sourceUrl) {
    return (
      <main className={styles.page}>
        <Center h="100svh"><Stack align="center"><Text c="white">Не удалось загрузить результат анализа.</Text></Stack></Center>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <AnalysisResultCompare
        streetsView={streetsView}
        dateBefore={area.dateBefore}
        dateAfter={area.dateAfter}
        sourceUrl={sourceUrl}
        activeLayers={layers.filter((layer) => activeLayerIds.includes(layer.id))}
      />
      <AnalysisResultHeader
        areaId={area.id}
        streetsView={streetsView}
        onToggleMapStyle={() => setStreetsView((current) => !current)}
      />
      <ResultLayersSection
        layers={layers}
        activeLayerIds={activeLayerIds}
        onActiveLayerIdsChange={setActiveLayerIds}
      />
      <ResultStatsSection />
    </main>
  );
}
