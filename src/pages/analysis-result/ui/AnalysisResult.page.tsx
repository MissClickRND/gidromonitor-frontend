import { useArea } from "@/entities/areas";
import { useState } from "react";
import { Center, Stack, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import { LoaderLogo } from "@/shared/ui/loader-logo";
import { AnalysisResultCompare } from "@/widgets/analysis-result-compare";
import { AnalysisResultHeader } from "@/widgets/analysis-result-header";
import { ResultLayersSection } from "./sections/ResultLayersSection";
import { ResultStatsSection } from "./sections/ResultStatsSection";
import { resultLayers } from "../model/layers";
import styles from "./AnalysisResult.page.module.css";

export default function AnalysisResultPage() {
  const [streetsView, setStreetsView] = useState(false);
  const [activeLayerIds, setActiveLayerIds] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const { data: area, isPending, isError } = useArea(id);

  if (isPending) {
    return (
      <main className={styles.page}>
        <Center h="100svh"><LoaderLogo size={96} label="Загрузка результата анализа" /></Center>
      </main>
    );
  }

  if (isError || !area) {
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
        layers={resultLayers.filter((layer) => activeLayerIds.includes(layer.id))}
      />
      <AnalysisResultHeader
        areaId={area.id}
        streetsView={streetsView}
        onToggleMapStyle={() => setStreetsView((current) => !current)}
      />
      <ResultLayersSection
        layers={resultLayers}
        activeLayerIds={activeLayerIds}
        onActiveLayerIdsChange={setActiveLayerIds}
      />
      <ResultStatsSection />
    </main>
  );
}
