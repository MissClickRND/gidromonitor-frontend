import { Button, Group, Paper, Stack, Table, Text, Title } from "@mantine/core";
import styles from "./RecentMeasurements.module.css";

type Measurement = {
  date: string;
  region: string;
  floodedArea: string;
};

type RecentMeasurementsProps = {
  measurements: Measurement[];
};

export default function RecentMeasurements({ measurements }: RecentMeasurementsProps) {
  return (
    <Paper component="section" aria-labelledby="recent-measurements-title" radius="lg" shadow="sm" p={{ base: "md", sm: "xl" }}>
      <Stack gap="lg">
        <Group justify="space-between" align="end" gap="md">
          <Stack gap={0}>
            <Text c="primary.6" fw={700} size="sm" tt="uppercase" lts="0.08em">
              Мониторинг
            </Text>
            <Title id="recent-measurements-title" order={2} size="clamp(1.35rem, 2vw, 1.8rem)">
              Последние измерения
            </Title>
          </Stack>
          <Text c="dimmed" size="sm">
            Показаны последние 5 измерений
          </Text>
        </Group>

        <Table.ScrollContainer minWidth={620} type="native">
          <Table verticalSpacing="md" highlightOnHover className={styles.table}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Дата</Table.Th>
                <Table.Th>Название</Table.Th>
                <Table.Th>Площадь затопления</Table.Th>
                <Table.Th ta="right">Действие</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {measurements.map((measurement) => (
                <Table.Tr key={`${measurement.date}-${measurement.region}`}>
                  <Table.Td>
                    <Text fw={600} size="sm">
                      {measurement.date}
                    </Text>
                  </Table.Td>
                  <Table.Td>{measurement.region}</Table.Td>
                  <Table.Td>
                    <Text fw={600} c={measurement.floodedArea === "0 га" ? "dimmed" : "primary.6"}>
                      {measurement.floodedArea}
                    </Text>
                  </Table.Td>
                  <Table.Td ta="right">
                    <Button type="button" variant="light" size="xs">
                      Перейти
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Stack>
    </Paper>
  );
}
