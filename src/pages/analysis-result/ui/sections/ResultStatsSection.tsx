import { Paper, Text } from "@mantine/core";
import styles from "./ResultStatsSection.module.css";

const stats = [
  { label: "Новое затопление", value: "1 842,6", unit: "га", detail: "18,43 км²", accent: true },
  { label: "Вода до события", value: "12 458,1", unit: "га", detail: "дата · 18.07.2019" },
  { label: "Вода на пике", value: "14 300,7", unit: "га", detail: "изменение · +1 842,6 га" },
  { label: "Доля затопления", value: "1,24", unit: "%", detail: "от площади района анализа" },
];

export function ResultStatsSection() {
  return (
    <Paper className={styles.stats} radius="lg" shadow="xl">
      {stats.map((stat) => (
        <div key={stat.label} className={styles.item}>
          <Text size="xs" c="dimmed">{stat.label}</Text>
          <Text className={styles.value} data-accent={stat.accent || undefined}>
            {stat.value} <span>{stat.unit}</span>
          </Text>
          <Text className={styles.detail}>{stat.detail}</Text>
        </div>
      ))}
    </Paper>
  );
}
