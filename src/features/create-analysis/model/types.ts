export type TerritoryMode = "polygon" | "rectangle";

export type Coordinate = [longitude: number, latitude: number];

export type AnalysisFormValues = {
  name: string;
  territoryMode: TerritoryMode;
  dateBefore: string;
  dateAfter: string;
};

export type AnalysisPayload = AnalysisFormValues & {
  territory: {
    type: "Polygon";
    coordinates: Coordinate[][];
  };
};
