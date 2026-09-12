import { Badge, Button, Card, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { usePageTransition } from "@/shared/ui/page-transition";
import styles from "./AnalysisResult.page.module.css";

const resultItems = [
  { label: "Территория", value: "Река Зея, Благовещенск" },
  { label: "Период до", value: "11.09.2026" },
  { label: "Период после", value: "19.09.2026" },
  { label: "Площадь затопления", value: "1 284 га" },
];

export default function AnalysisResultPage() {
  const { navigateWithTransition } = usePageTransition();

  return (
    <main className={styles.page}>
      <Card className={styles.card} radius="lg" shadow="xl" padding="xl">
        <Stack gap="xl">
          <Group justify="space-between" align="flex-start" gap="md">
            <Stack gap={6}>
              <Text c="primary.6" fw={700} size="sm" tt="uppercase" lts="0.08em">
                Результат анализа
              </Text>
              <Title order={1}>Паводок на реке Зея</Title>
              <Text c="dimmed">Анализ спутниковых снимков Sentinel-1</Text>
            </Stack>
            <Badge color="teal" variant="light" size="lg">
              Завершён
            </Badge>
          </Group>

          <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="md">
            {resultItems.map((item) => (
              <Card key={item.label} className={styles.infoCard} radius="md" padding="md">
                <Text c="dimmed" size="sm">
                  {item.label}
                </Text>
                <Text fw={600} mt={4} c="#173a4c">
                  {item.value}
                </Text>
              </Card>
            ))}
          </SimpleGrid>

          <Card className={styles.resultPlaceholder} radius="md" padding="xl">
            <Stack align="center" gap="xs">
              <Title order={3}>Слой результата готов</Title>
              <Text ta="center" c="dimmed" maw={520}>
                Здесь будет интерактивная карта с зоной затопления и подробной информацией по наблюдению.
              </Text>
            </Stack>
          </Card>

          <Button variant="light" size="md" onClick={() => navigateWithTransition("/analysis")}>
            Создать новый анализ
          </Button>
        </Stack>
      </Card>
    </main>
  );
}
