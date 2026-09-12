import { ApiPage } from "@/pages/api";
import { AnalysisPage } from "@/pages/analysis";
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
        path: "/",
        element: <Main />,
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: "/analysis",
            element: <AnalysisPage />,
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
