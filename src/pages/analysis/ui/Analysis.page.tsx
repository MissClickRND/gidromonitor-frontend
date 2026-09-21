import type { IAreaResponse } from "@/entities/areas";
import { useTerritoryGeometry } from "@/features/create-analysis";
import { AnalysisMap } from "@/widgets/analysis-map";
import { AnalysisSidebar } from "@/widgets/analysis-sidebar";
import { Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnalysisProgressSheet from "./components/AnalysisProgressSheet";
import styles from "./Analysis.page.module.css";

export default function AnalysisPage() {
  const geometry = useTerritoryGeometry();
  const navigate = useNavigate();
  const [processingArea, setProcessingArea] = useState<IAreaResponse | null>(null);

  const finishProcessing = () => {
    if (processingArea) {
      navigate(`/analysis/result/${processingArea.id}`, { replace: true });
    }
  };

  useEffect(() => {
    if (processingArea?.status === "done") {
      navigate(`/analysis/result/${processingArea.id}`, { replace: true });
    }
  }, [navigate, processingArea]);

  return (
    <>
      <Box component="main" className={styles.page}>
        <AnalysisMap
          mode={geometry.mode}
          coordinates={geometry.coordinates}
          geometryIsValid={geometry.isValid}
          onAddPolygonPoint={geometry.addPolygonPoint}
          onSetRectangle={geometry.setRectangle}
          onClosePolygon={geometry.closePolygon}
          onUndo={geometry.undo}
          onClear={geometry.clear}
        />
        <AnalysisSidebar
          mode={geometry.mode}
          closedCoordinates={geometry.closedCoordinates}
          geometryIsValid={geometry.isValid}
          onModeChange={geometry.setMode}
          onAnalysisStart={setProcessingArea}
        />
      </Box>
      <AnalysisProgressSheet
        opened={Boolean(processingArea)}
        area={processingArea}
        onClose={finishProcessing}
      />
    </>
  );
}
