import type { Territory } from "@/entities/areas";

export type { Coordinate } from "@/entities/areas";

export type TerritoryMode = "polygon" | "rectangle";

export type AnalysisFormValues = {
  name: string;
  territoryMode: TerritoryMode;
  dateBefore: string;
  dateAfter: string;
};

export type AnalysisPayload = AnalysisFormValues & {
  territory: Territory;
};
