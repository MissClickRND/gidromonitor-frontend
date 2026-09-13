import { Compare } from "@gfazioli/mantine-compare";
import { Box, Text } from "@mantine/core";
import { useState } from "react";
import Map from "react-map-gl/maplibre";
import styles from "./AnalysisResultCompare.module.css";

const mapStyleUrl = import.meta.env.VITE_MAP_STYLE_URL;
const streetsStyleUrl = import.meta.env.VITE_MAP_STREETS_STYLE_URL;
const initialViewState = { longitude: 127.5331, latitude: 50.2907, zoom: 11 };

type AnalysisResultCompareProps = {
  streetsView: boolean;
};

type MapPaneProps = {
  label: string;
  date: string;
  side: "before" | "after";
  streetsView: boolean;
  viewState: typeof initialViewState;
  onViewStateChange: (viewState: typeof initialViewState) => void;
};

function MapPane({
  label,
  date,
  side,
  streetsView,
  viewState,
  onViewStateChange,
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
      />
      <Box className={styles.mapLabel} data-side={side}>
        <Text className={styles.mapLabelTitle}>{label}</Text>
        <Text className={styles.mapLabelDate}>{date}</Text>
      </Box>
    </Box>
  );
}

export default function AnalysisResultCompare({
  streetsView,
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
          date="18.07.2019"
          side="before"
          streetsView={streetsView}
          viewState={viewState}
          onViewStateChange={setViewState}
        />
      }
      rightSection={
        <MapPane
          label="После"
          date="20.07.2019"
          side="after"
          streetsView={streetsView}
          viewState={viewState}
          onViewStateChange={setViewState}
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
