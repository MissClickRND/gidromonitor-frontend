import { Outlet } from "react-router-dom";
import AnalysisNavigation from "./components/analysis-navigation/AnalysisNavigation";

export default function MainLayout() {
  return (
    <>
      <AnalysisNavigation />
      <Outlet />
    </>
  );
}
