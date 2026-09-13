import { ApiPage } from "@/pages/api";
import { AnalysisPage } from "@/pages/analysis";
import {
  AnalysisResultAnalyticsPage,
  AnalysisResultPage,
  AnalysisResultReportPage,
} from "@/pages/analysis-result";
import { CalculationsPage } from "@/pages/calculations";
import { Main } from "@/pages/main";
import { PageTransitionProvider } from "@/shared/ui/page-transition";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function TransitionLayout() {
  return (
    <PageTransitionProvider>
      <Outlet />
    </PageTransitionProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <TransitionLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Main />,
          },
          {
            path: "/analysis",
            element: <AnalysisPage />,
          },
          {
            path: "/analysis/result",
            children: [
              { index: true, element: <AnalysisResultPage /> },
              { path: "analytics", element: <AnalysisResultAnalyticsPage /> },
              { path: "report", element: <AnalysisResultReportPage /> },
            ],
          },
          {
            path: "/calculations",
            element: <CalculationsPage />,
          },
          {
            path: "/api",
            element: <ApiPage />,
          },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
