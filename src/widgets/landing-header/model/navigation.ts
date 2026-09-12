export type LandingNavigationItem = {
  label: string;
  path: string;
};

export const landingNavigation: LandingNavigationItem[] = [
  { label: "Главная", path: "/" },
  { label: "Анализ", path: "/analysis" },
  { label: "Измерения", path: "/calculations" },
  { label: "API", path: "/api" },
];
