import { useCallback, useState } from "react";
import type { Coordinate, TerritoryMode } from "../types";

export function useTerritoryGeometry() {
  const [mode, setModeState] = useState<TerritoryMode>("polygon");
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [isPolygonClosed, setIsPolygonClosed] = useState(false);

  const setMode = useCallback((nextMode: TerritoryMode) => {
    setModeState(nextMode);
    setCoordinates([]);
    setIsPolygonClosed(false);
  }, []);

  const addPolygonPoint = useCallback(
    (point: Coordinate) => {
      if (isPolygonClosed) return;
      setCoordinates((current) => [...current, point]);
    },
    [isPolygonClosed],
  );

  const setRectangle = useCallback((points: Coordinate[]) => {
    setCoordinates(points);
  }, []);

  const closePolygon = useCallback(() => {
    if (mode === "polygon" && coordinates.length >= 3) {
      setIsPolygonClosed(true);
    }
  }, [coordinates.length, mode]);

  const undo = useCallback(() => {
    if (mode === "polygon" && isPolygonClosed) {
      setIsPolygonClosed(false);
      return;
    }

    setCoordinates((current) =>
      mode === "polygon" ? current.slice(0, -1) : [],
    );
  }, [isPolygonClosed, mode]);

  const clear = useCallback(() => {
    setCoordinates([]);
    setIsPolygonClosed(false);
  }, []);

  const isValid =
    mode === "polygon"
      ? coordinates.length >= 3 && isPolygonClosed
      : coordinates.length === 4;

  const closedCoordinates: Coordinate[] = isValid
    ? [...coordinates, coordinates[0]]
    : coordinates;

  return {
    mode,
    coordinates,
    closedCoordinates,
    isValid,
    setMode,
    addPolygonPoint,
    setRectangle,
    closePolygon,
    undo,
    clear,
  };
}
