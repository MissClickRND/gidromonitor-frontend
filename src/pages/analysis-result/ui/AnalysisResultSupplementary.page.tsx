import { Paper, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AnalysisResultHeader } from "@/widgets/analysis-result-header";
import styles from "./AnalysisResultSupplementary.page.module.css";

type SupplementaryPageProps = {
  title: string;
  description: string;
};

function SupplementaryPage({ title, description }: SupplementaryPageProps) {
  const [streetsView, setStreetsView] = useState(false);
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <main className={styles.page}>
      <AnalysisResultHeader
        areaId={id}
        streetsView={streetsView}
        onToggleMapStyle={() => setStreetsView((current) => !current)}
      />
      <Paper className={styles.placeholder} radius="lg" shadow="xl">
        <Stack gap={7} align="center">
          <Text size="sm" tt="uppercase" fw={700} c="primary.6" lts="0.08em">
            Результат анализа
          </Text>
          <Title order={1}>{title}</Title>
          <Text c="dimmed" ta="center" maw={460}>{description}</Text>
        </Stack>
      </Paper>
    </main>
  );
}

export function AnalysisResultAnalyticsPage() {
  return <SupplementaryPage title="Аналитика" description="Здесь появятся детальные графики и показатели анализа." />;
}

export function AnalysisResultReportPage() {
  return <SupplementaryPage title="Отчёт" description="Здесь будет сформированный отчёт по результатам анализа." />;
}
