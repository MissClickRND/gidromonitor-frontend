import type { Coordinate, TerritoryMode } from "@/features/create-analysis";
import { useCallback, useEffect, useRef, useState } from "react";
import Map, {
  ScaleControl,
  type MapLayerMouseEvent,
  type MapRef,
} from "react-map-gl/maplibre";
import MapToolbar from "./MapToolbar";
import { geocodeCity } from "../model/geocodeCity";
import styles from "./AnalysisMap.module.css";

const mapStyleUrl = import.meta.env.VITE_MAP_STYLE_URL;
const streetsStyleUrl = import.meta.env.VITE_MAP_STREETS_STYLE_URL;
const BLAGOVESHCHENSK = { longitude: 127.5331, latitude: 50.2907, zoom: 11 };

type AnalysisMapProps = {
  mode: TerritoryMode;
  coordinates: Coordinate[];
  geometryIsValid: boolean;
  onAddPolygonPoint: (point: Coordinate) => void;
  onSetRectangle: (points: Coordinate[]) => void;
};

function createRectangle(start: Coordinate, end: Coordinate): Coordinate[] {
  return [
    [start[0], start[1]],
    [end[0], start[1]],
    [end[0], end[1]],
    [start[0], end[1]],
  ];
}

export default function AnalysisMap({
  mode,
  coordinates,
  geometryIsValid,
  onAddPolygonPoint,
  onSetRectangle,
}: AnalysisMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [rectangleStart, setRectangleStart] = useState<Coordinate | null>(null);
  const [rectanglePreview, setRectanglePreview] = useState<Coordinate[]>([]);
  const [projectedCoordinates, setProjectedCoordinates] = useState<
    Coordinate[]
  >([]);
  const [streetsView, setStreetsView] = useState(false);

  const visibleCoordinates = rectanglePreview.length
    ? rectanglePreview
    : coordinates;
  const visibleIsPolygon =
    mode === "rectangle" ? visibleCoordinates.length === 4 : geometryIsValid;

  const refreshProjection = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    setProjectedCoordinates(
      visibleCoordinates.map(([longitude, latitude]) => {
        const point = map.project([longitude, latitude]);
        return [point.x, point.y];
      }),
    );
  }, [visibleCoordinates]);

  useEffect(() => {
    refreshProjection();
  }, [refreshProjection]);

  const pointsAttribute = projectedCoordinates
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  const handleClick = (event: MapLayerMouseEvent) => {
    if (mode !== "polygon") return;
    onAddPolygonPoint([event.lngLat.lng, event.lngLat.lat]);
  };

  const handleMouseDown = (event: MapLayerMouseEvent) => {
    if (mode !== "rectangle" || event.originalEvent.button !== 0) return;
    event.originalEvent.preventDefault();
    const start: Coordinate = [event.lngLat.lng, event.lngLat.lat];
    setRectangleStart(start);
    setRectanglePreview(createRectangle(start, start));
  };

  const handleMouseMove = (event: MapLayerMouseEvent) => {
    if (!rectangleStart) return;
    setRectanglePreview(
      createRectangle(rectangleStart, [event.lngLat.lng, event.lngLat.lat]),
    );
  };

  const finishRectangle = (event: MapLayerMouseEvent) => {
    if (!rectangleStart) return;
    const rectangle = createRectangle(rectangleStart, [
      event.lngLat.lng,
      event.lngLat.lat,
    ]);
    setRectangleStart(null);
    setRectanglePreview([]);
    onSetRectangle(rectangle);
  };

  const flyToCity = useCallback((cityCoordinates: Coordinate) => {
    mapRef.current?.flyTo({
      center: cityCoordinates,
      zoom: 11,
      duration: 900,
      essential: true,
    });
  }, []);

  const searchCity = useCallback(
    async (query: string) => {
      const city = await geocodeCity(query);
      if (city) flyToCity(city.coordinates);
      return city;
    },
    [flyToCity],
  );

  return (
    <section className={styles.root} aria-label="Карта выбора территории">
      <Map
        ref={mapRef}
        initialViewState={BLAGOVESHCHENSK}
        mapStyle={streetsView ? streetsStyleUrl : mapStyleUrl}
        attributionControl={false}
        dragPan={mode !== "rectangle"}
        doubleClickZoom={false}
        cursor={
          rectangleStart
            ? "crosshair"
            : mode === "rectangle"
              ? "crosshair"
              : "pointer"
        }
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={finishRectangle}
        onLoad={refreshProjection}
        onMove={refreshProjection}
        onResize={refreshProjection}
      >
        <ScaleControl position="bottom-right" />
      </Map>

      <MapToolbar
        streetsView={streetsView}
        onToggleStyle={() => setStreetsView((current) => !current)}
        onSearchCity={searchCity}
      />

      <svg className={styles.drawingOverlay} aria-hidden="true">
        {projectedCoordinates.length > 1 &&
          (visibleIsPolygon ? (
            <polygon className={styles.shape} points={pointsAttribute} />
          ) : (
            <polyline className={styles.line} points={pointsAttribute} />
          ))}
        {projectedCoordinates.map(([x, y], index) => (
          <circle
            key={`${index}-${x}-${y}`}
            className={styles.vertex}
            cx={x}
            cy={y}
            r="6"
          />
        ))}
      </svg>
    </section>
  );
}
