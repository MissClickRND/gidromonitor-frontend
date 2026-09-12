import type { Coordinate } from "@/features/create-analysis";

export type CityOption = {
  name: string;
  coordinates: Coordinate;
};

export const cityOptions: CityOption[] = [
  { name: "Благовещенск", coordinates: [127.5331, 50.2907] },
  { name: "Хабаровск", coordinates: [135.0719, 48.4802] },
  { name: "Владивосток", coordinates: [131.8855, 43.1155] },
  { name: "Якутск", coordinates: [129.7326, 62.0355] },
  { name: "Москва", coordinates: [37.6173, 55.7558] },
];
