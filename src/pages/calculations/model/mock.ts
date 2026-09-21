import type { IAreaResponse } from "@/entities/areas";

export type MeasurementRecord = {
  id: string;
  name: string;
  eventDate: string;
  periodStart: string;
  periodEnd: string;
  eventType: "Новое затопление" | "Убыль воды" | "Стабильное состояние";
  measurementType: string;
  area: number;
  previewImage: string;
};

const mockEventTypes: MeasurementRecord["eventType"][] = [
  "Новое затопление",
  "Стабильное состояние",
  "Убыль воды",
];

const mockAreas = [1284, 342, 0, 756, 196, 1102, 620, 0, 438, 118];

function toDateKey(value: Date | string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

export function areaToMeasurementRecord(
  area: IAreaResponse,
  index: number,
): MeasurementRecord {
  const periodStart = toDateKey(area.dateBefore);
  const periodEnd = toDateKey(area.dateAfter);

  return {
    id: area.id,
    name: area.name,
    eventDate: periodEnd || toDateKey(area.createdAt),
    periodStart,
    periodEnd,
    eventType: mockEventTypes[index % mockEventTypes.length],
    measurementType: "Измерение водной поверхности",
    area: mockAreas[index % mockAreas.length],
    previewImage: "/img/main.png",
  };
}
