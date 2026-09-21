export type Coordinate = [longitude: number, latitude: number];

export type Territory = {
  type: "Polygon";
  coordinates: Coordinate[][];
};

export type StatusArea = "processing" | "done";

export interface ICreateArea {
  name: string;
  geometry: Territory;
  dateBefore: Date;
  dateAfter: Date;
}

export type IAreaResponse = ICreateArea & {
  id: string;
  status: StatusArea;
  createdAt: Date;
  updatedAt: Date;
};
