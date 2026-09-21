import { Compare } from "@gfazioli/mantine-compare";
import { Box, Text } from "@mantine/core";
import { localCogPreviewLayer, type ResultLayer } from "@/pages/analysis-result/model/layers";
import { registerCogProtocol } from "@/shared/lib";
import { useState } from "react";
import Map from "react-map-gl/maplibre";
import ResultCogLayers from "./ResultCogLayers";
import styles from "./AnalysisResultCompare.module.css";

const mapStyleUrl = import.meta.env.VITE_MAP_STYLE_URL;
const streetsStyleUrl = import.meta.env.VITE_MAP_STREETS_STYLE_URL;
const initialViewState = { longitude: 127.5331, latitude: 50.2907, zoom: 11 };

registerCogProtocol();

type AnalysisResultCompareProps = {
  streetsView: boolean;
  dateBefore: Date;
  dateAfter: Date;
  layers: ResultLayer[];
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU");

type MapPaneProps = {
  label: string;
  date: string;
  side: "before" | "after";
  streetsView: boolean;
  viewState: typeof initialViewState;
  onViewStateChange: (viewState: typeof initialViewState) => void;
  layers: ResultLayer[];
};

function MapPane({
  label,
  date,
  side,
  streetsView,
  viewState,
  onViewStateChange,
  layers,
}: MapPaneProps) {
  return (
    <Box className={styles.mapPane}>
      <Map
        {...viewState}
        mapStyle={streetsView ? streetsStyleUrl : mapStyleUrl}
        attributionControl={false}
        dragRotate={false}
        touchPitch={false}
        touchZoomRotate={false}
        onMove={(event) => onViewStateChange(event.viewState)}
      >
        <ResultCogLayers layers={[localCogPreviewLayer, ...layers]} />
      </Map>
      <Box className={styles.mapLabel} data-side={side}>
        <Text className={styles.mapLabelTitle}>{label}</Text>
        <Text className={styles.mapLabelDate}>{date}</Text>
      </Box>
    </Box>
  );
}

export default function AnalysisResultCompare({
  streetsView,
  dateBefore,
  dateAfter,
  layers,
}: AnalysisResultCompareProps) {
  const [viewState, setViewState] = useState(initialViewState);

  return (
    <Compare
      className={styles.compare}
      radius={0}
      aspectRatio="auto"
      defaultPosition={50}
      leftSection={
        <MapPane
          label="До"
          date={dateFormatter.format(new Date(dateBefore))}
          side="before"
          streetsView={streetsView}
          viewState={viewState}
          onViewStateChange={setViewState}
          layers={layers}
        />
      }
      rightSection={
        <MapPane
          label="После"
          date={dateFormatter.format(new Date(dateAfter))}
          side="after"
          streetsView={streetsView}
          viewState={viewState}
          onViewStateChange={setViewState}
          layers={layers}
        />
      }
      classNames={{
        root: styles.compareRoot,
        slider: styles.slider,
        sliderLine: styles.sliderLine,
        sliderButton: styles.sliderButton,
      }}
    />
  );
}
