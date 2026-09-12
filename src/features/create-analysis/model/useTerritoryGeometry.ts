import { useCallback, useState } from "react";
import type { Coordinate, TerritoryMode } from "./types";

export function useTerritoryGeometry() {
  const [mode, setModeState] = useState<TerritoryMode>("polygon");
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  const setMode = useCallback((nextMode: TerritoryMode) => {
    setModeState(nextMode);
    setCoordinates([]);
  }, []);

  const addPolygonPoint = useCallback((point: Coordinate) => {
    setCoordinates((current) => [...current, point]);
  }, []);

  const setRectangle = useCallback((points: Coordinate[]) => {
    setCoordinates(points);
  }, []);

  const undo = useCallback(() => {
    setCoordinates((current) =>
      mode === "polygon" ? current.slice(0, -1) : [],
    );
  }, [mode]);

  const clear = useCallback(() => setCoordinates([]), []);

  const isValid =
    mode === "polygon" ? coordinates.length >= 3 : coordinates.length === 4;

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
    undo,
    clear,
  };
}
