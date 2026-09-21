import { Box, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { LoaderLogo } from "@/shared/ui/loader-logo";
import { useState } from "react";
import Map, { ScaleControl } from "react-map-gl/maplibre";
import styles from "./MapDashboard.module.css";

type MonitoringStat = {
  label: string;
  value: string;
  description: string;
};

type MapDashboardProps = {
  stats: MonitoringStat[];
};

const mapStyleUrl = import.meta.env.VITE_MAP_STYLE_URL;

export default function MapDashboard({ stats }: MapDashboardProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <Box component="section" aria-labelledby="map-dashboard-title" className={styles.map}>
      <Map
        aria-label="Карта гидромониторинга"
        initialViewState={{
          longitude: 37.6173,
          latitude: 55.7558,
          zoom: 9,
        }}
        mapStyle={mapStyleUrl}
        dragPan={false}
        dragRotate={false}
        scrollZoom={false}
        doubleClickZoom={false}
        touchPitch={false}
        touchZoomRotate={false}
        keyboard={false}
        onLoad={() => setMapLoaded(true)}
      >
        <ScaleControl position="bottom-left" />
      </Map>

      {!mapLoaded && (
        <Box className={styles.mapLoader} aria-label="Карта загружается">
          <LoaderLogo size={72} label="Карта загружается" />
        </Box>
      )}

      <Paper className={styles.heading} radius="lg" shadow="sm" p="lg">
        <Stack gap="xs">
          <Title id="map-dashboard-title" order={1} size="clamp(1.75rem, 3vw, 2.65rem)" lh={1.08}>
            Мониторинг водных объектов и паводков из космоса
          </Title>
          <Text c="dimmed" size="md" lh={1.45} maw={440}>
            Совмещаем данные Sentinel-1 и Sentinel-2 для оперативного выявления затоплений — при любой погоде.
          </Text>
        </Stack>
      </Paper>

      <SimpleGrid cols={{ base: 1, xs: 3 }} spacing="sm" className={styles.stats}>
        {stats.map((stat) => (
          <Paper key={stat.label} radius="md" shadow="sm" p="md" className={styles.statCard}>
            <Stack gap={2}>
              <Text className={styles.statValue}>{stat.value}</Text>
              <Text fw={600} size="sm">
                {stat.label}
              </Text>
              <Text c="dimmed" size="xs">
                {stat.description}
              </Text>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Box>
  );
}
