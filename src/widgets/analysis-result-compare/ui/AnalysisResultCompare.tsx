import { Compare } from "@gfazioli/mantine-compare";
import { Box, Loader, Text } from "@mantine/core";
import type { ResultLayer } from "@/pages/analysis-result/model/layers";
import { registerCogProtocol } from "@/shared/lib";
import { useCallback, useEffect, useState } from "react";
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
  sourceUrl: string;
  activeLayers: ResultLayer[];
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU");
type MapPaneSide = "before" | "after";

type MapPaneProps = {
  label: string;
  date: string;
  side: MapPaneSide;
  streetsView: boolean;
  viewState: typeof initialViewState;
  onViewStateChange: (viewState: typeof initialViewState) => void;
  sourceUrl: string;
  activeLayers: ResultLayer[];
  onLoadingChange: (side: MapPaneSide, isLoading: boolean) => void;
};

function MapPane({
  label,
  date,
  side,
  streetsView,
  viewState,
  onViewStateChange,
  sourceUrl,
  activeLayers,
  onLoadingChange,
}: MapPaneProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadedLayersKey, setLoadedLayersKey] = useState("");
  const activeLayersKey = activeLayers.map((layer) => layer.id).join("-");
  const cogLoading = Boolean(activeLayersKey) && loadedLayersKey !== activeLayersKey;
  const isLoading = !mapLoaded || cogLoading;

  useEffect(() => {
    setMapLoaded(false);
  }, [streetsView]);

  useEffect(() => {
    if (!activeLayersKey) {
      setLoadedLayersKey("");
    }
  }, [activeLayersKey]);

  useEffect(() => {
    onLoadingChange(side, isLoading);
  }, [isLoading, onLoadingChange, side]);

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
        onLoad={() => setMapLoaded(true)}
        onSourceData={(event) => {
          if (event.sourceId === "result-cog-source" && event.isSourceLoaded) {
            setLoadedLayersKey(activeLayersKey);
          }
        }}
      >
        <ResultCogLayers sourceUrl={sourceUrl} activeLayers={activeLayers} />
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
  sourceUrl,
  activeLayers,
}: AnalysisResultCompareProps) {
  const [viewState, setViewState] = useState(initialViewState);
  const [loadingPanes, setLoadingPanes] = useState({ before: true, after: true });
  const setPaneLoading = useCallback(
    (side: MapPaneSide, isLoading: boolean) => {
      setLoadingPanes((current) =>
        current[side] === isLoading ? current : { ...current, [side]: isLoading },
      );
    },
    [],
  );

  return (
    <Box className={styles.compareContainer}>
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
            sourceUrl={sourceUrl}
            activeLayers={activeLayers}
            onLoadingChange={setPaneLoading}
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
            sourceUrl={sourceUrl}
            activeLayers={activeLayers}
            onLoadingChange={setPaneLoading}
          />
        }
        classNames={{
          root: styles.compareRoot,
          slider: styles.slider,
          sliderLine: styles.sliderLine,
          sliderButton: styles.sliderButton,
        }}
      />
      {(loadingPanes.before || loadingPanes.after) && (
        <Box className={styles.compareLoader} role="status" aria-label="Загрузка карты">
          <Loader color="white" size="lg" />
        </Box>
      )}
    </Box>
  );
}
