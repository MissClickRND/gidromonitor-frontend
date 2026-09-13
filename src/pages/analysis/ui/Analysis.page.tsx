import { useTerritoryGeometry } from "@/features/create-analysis";
import { AnalysisMap } from "@/widgets/analysis-map";
import { AnalysisSidebar } from "@/widgets/analysis-sidebar";
import { Box } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnalysisProgressSheet from "./components/AnalysisProgressSheet";
import styles from "./Analysis.page.module.css";

export default function AnalysisPage() {
  const geometry = useTerritoryGeometry();
  const navigate = useNavigate();
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [navigateAfterClose, setNavigateAfterClose] = useState(false);

  const handleFinishAnalysis = () => {
    setNavigateAfterClose(true);
    setAnalysisRunning(false);
  };

  const handleSheetExit = () => {
    if (!navigateAfterClose) return;
    setNavigateAfterClose(false);
    navigate("/analysis/result");
  };

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
          onAnalysisStart={() => setAnalysisRunning(true)}
        />
      </Box>
      <AnalysisProgressSheet
        opened={analysisRunning}
        onFinish={handleFinishAnalysis}
        onExitTransitionEnd={handleSheetExit}
      />
    </>
  );
}
