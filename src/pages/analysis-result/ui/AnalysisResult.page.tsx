import { useState } from "react";
import { AnalysisResultCompare } from "@/widgets/analysis-result-compare";
import { AnalysisResultHeader } from "@/widgets/analysis-result-header";
import { ResultLayersSection } from "./sections/ResultLayersSection";
import { ResultStatsSection } from "./sections/ResultStatsSection";
import styles from "./AnalysisResult.page.module.css";

export default function AnalysisResultPage() {
  const [streetsView, setStreetsView] = useState(false);

  return (
    <main className={styles.page}>
      <AnalysisResultCompare streetsView={streetsView} />
      <AnalysisResultHeader
        streetsView={streetsView}
        onToggleMapStyle={() => setStreetsView((current) => !current)}
      />
      <ResultLayersSection />
      <ResultStatsSection />
    </main>
  );
}
