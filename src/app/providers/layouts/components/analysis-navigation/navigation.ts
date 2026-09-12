export type AnalysisNavigationItem = {
  label: string;
  path: string;
};

export const analysisNavigation: AnalysisNavigationItem[] = [
  { label: "Главная", path: "/" },
  { label: "Анализ", path: "/analysis" },
  { label: "Измерения", path: "/calculations" },
  { label: "API", path: "/api" },
];
