import {
  ActionIcon,
  Badge,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import type { MeasurementRecord } from "../../model/mock";
import styles from "../Calculations.page.module.css";

type Props = {
  records: MeasurementRecord[];
  page: number;
  onPageChange: (page: number) => void;
  onOpen: (record: MeasurementRecord) => void;
};
const pageSize = 8;
const dateFormatter = new Intl.DateTimeFormat("ru-RU");
const colors: Record<MeasurementRecord["eventType"], string> = {
  "Новое затопление": "red",
  "Убыль воды": "orange",
  "Стабильное состояние": "blue",
};

export default function MeasurementsTable({
  records,
  page,
  onPageChange,
  onOpen,
}: Props) {
  const totalPages = Math.ceil(records.length / pageSize);
  const visibleRecords = records.slice((page - 1) * pageSize, page * pageSize);
  const formatPeriod = (record: MeasurementRecord) => {
    const fallbackStart = new Date(`${record.eventDate}T00:00:00`);
    fallbackStart.setDate(fallbackStart.getDate() - 7);
    const start =
      record.periodStart ?? fallbackStart.toISOString().slice(0, 10);
    const end = record.periodEnd ?? record.eventDate;
    return start === end
      ? dateFormatter.format(new Date(`${start}T00:00:00`))
      : `${dateFormatter.format(new Date(`${start}T00:00:00`))} — ${dateFormatter.format(new Date(`${end}T00:00:00`))}`;
  };
  return (
    <Paper radius="lg" withBorder className={styles.tablePaper}>
      <ScrollArea>
        <Table verticalSpacing="md" highlightOnHover miw={950}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Дата измерения</Table.Th>
              <Table.Th>Название</Table.Th>
              <Table.Th>Даты</Table.Th>
              <Table.Th>Тип</Table.Th>
              <Table.Th>События</Table.Th>
              <Table.Th ta="center">Действие</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {visibleRecords.map((record) => (
              <Table.Tr key={record.id}>
                <Table.Td>
                  {dateFormatter.format(
                    new Date(`${record.eventDate}T00:00:00`),
                  )}
                </Table.Td>
                <Table.Td>
                  <Text fw={500}>{record.name}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">
                    {formatPeriod(record)}
                  </Text>
                </Table.Td>
                <Table.Td>
                  {record.measurementType ?? "Измерение территории"}
                </Table.Td>
                <Table.Td>
                  <Badge
                    variant="light"
                    color={colors[record.eventType]}
                    radius="sm"
                  >
                    {record.eventType}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group justify="center">
                    <ActionIcon
                      size="lg"
                      radius="md"
                      variant="light"
                      aria-label={`Открыть измерение ${record.name}`}
                      onClick={() => onOpen(record)}
                    >
                      <IconEye size={21} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
      {!visibleRecords.length && (
        <Text ta="center" c="dimmed" py="xl">
          Ничего не найдено
        </Text>
      )}
      {totalPages > 1 && (
        <Group justify="space-between" p="md" className={styles.pagination}>
          <Text size="sm" c="dimmed">
            Показано {(page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, records.length)} из {records.length}
          </Text>
          <Pagination
            total={totalPages}
            value={page}
            onChange={onPageChange}
            withEdges
          />
        </Group>
      )}
    </Paper>
  );
}
