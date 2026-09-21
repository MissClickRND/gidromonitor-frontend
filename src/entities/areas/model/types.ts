export type Coordinate = [longitude: number, latitude: number];

export type Territory = {
  type: "Polygon";
  coordinates: Coordinate[][];
};

export type ICreateArea = {
  name: string;
  geometry: Territory;
  dateBefore: Date;
  dateAfter: Date;
};
