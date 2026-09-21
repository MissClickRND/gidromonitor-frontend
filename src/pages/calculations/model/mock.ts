export type MeasurementRecord = {
  id: string;
  name: string;
  eventDate: string;
  region: string;
  eventType: "Новое затопление" | "Убыль воды" | "Стабильное состояние";
  area: number;
  previewImage: string;
  periodStart?: string;
  periodEnd?: string;
  measurementType?: string;
};

export const measurementRecords: MeasurementRecord[] = [
  {
    id: "m-01",
    name: "Паводок в Благовещенском районе",
    eventDate: "2026-09-11",
    region: "Благовещенский район",
    eventType: "Новое затопление",
    area: 1284,
    previewImage: "/img/main.png",
  },
  {
    id: "m-02",
    name: "Наблюдение Константиновки",
    eventDate: "2026-09-08",
    region: "Константиновский район",
    eventType: "Новое затопление",
    area: 342,
    previewImage: "/img/main.png",
  },
  {
    id: "m-03",
    name: "Контроль Ивановского района",
    eventDate: "2026-09-05",
    region: "Ивановский район",
    eventType: "Стабильное состояние",
    area: 0,
    previewImage: "/img/main.png",
  },
  {
    id: "m-04",
    name: "Измерение Михайловки",
    eventDate: "2026-09-02",
    region: "Михайловский район",
    eventType: "Новое затопление",
    area: 756,
    previewImage: "/img/main.png",
  },
  {
    id: "m-05",
    name: "Уровень воды Тамбовки",
    eventDate: "2026-08-28",
    region: "Тамбовский район",
    eventType: "Убыль воды",
    area: 196,
    previewImage: "/img/main.png",
  },
  {
    id: "m-06",
    name: "Паводок Благовещенска",
    eventDate: "2026-08-24",
    region: "Благовещенский район",
    eventType: "Новое затопление",
    area: 1102,
    previewImage: "/img/main.png",
  },
  {
    id: "m-07",
    name: "Наблюдение Зейского района",
    eventDate: "2026-08-18",
    region: "Зейский район",
    eventType: "Новое затопление",
    area: 620,
    previewImage: "/img/main.png",
  },
  {
    id: "m-08",
    name: "Контроль Селемджи",
    eventDate: "2026-08-12",
    region: "Селемджинский район",
    eventType: "Стабильное состояние",
    area: 0,
    previewImage: "/img/main.png",
  },
  {
    id: "m-09",
    name: "Измерение Архаринского района",
    eventDate: "2026-08-06",
    region: "Архаринский район",
    eventType: "Новое затопление",
    area: 438,
    previewImage: "/img/main.png",
  },
  {
    id: "m-10",
    name: "Наблюдение Свободного",
    eventDate: "2026-08-01",
    region: "Свободненский район",
    eventType: "Убыль воды",
    area: 118,
    previewImage: "/img/main.png",
  },
];
