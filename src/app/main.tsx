import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@gfazioli/mantine-compare/styles.css";
import "dayjs/locale/ru";
import "maplibre-gl/dist/maplibre-gl.css";
import "./providers/styles/index.css";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { queryClient } from "@/shared/api";
import { theme } from "./theme";
import { Router } from "./providers/routes/Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />
        <Router />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
