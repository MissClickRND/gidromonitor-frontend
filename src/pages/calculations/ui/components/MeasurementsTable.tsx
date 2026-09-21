import {
  ActionIcon,
  Badge,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { useLayoutEffect, useRef, useState } from "react";
import type { MeasurementRecord } from "../../model/mock";
import styles from "../Calculations.page.module.css";

type Props = {
  records: MeasurementRecord[];
  page: number;
  onPageChange: (page: number) => void;
  onOpen: (record: MeasurementRecord) => void;
  loading?: boolean;
};
const initialPageSize = 8;
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
  loading = false,
}: Props) {
  const paperRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useLayoutEffect(() => {
    const paper = paperRef.current;
    const container = paper?.parentElement;
    if (!paper || !container) return;

    const measure = () => {
      const available = container.getBoundingClientRect().bottom - paper.getBoundingClientRect().top;
      const headerHeight = paper.querySelector("thead")?.getBoundingClientRect().height ?? 52;
      const rowHeight = paper.querySelector("tbody tr")?.getBoundingClientRect().height ?? 76;
      const rowsWithoutFooter = Math.max(1, Math.floor((available - headerHeight - 4) / rowHeight));
      const footerHeight = 72;
      const nextSize = !loading && records.length <= rowsWithoutFooter
        ? rowsWithoutFooter
        : Math.max(1, Math.floor((available - headerHeight - footerHeight - 4) / rowHeight));
      setPageSize((current) => current === nextSize ? current : nextSize);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [loading, records.length]);

  const totalPages = Math.ceil(records.length / pageSize);
  const currentPage = Math.min(page, Math.max(1, totalPages));
  const visibleRecords = records.slice((currentPage - 1) * pageSize, currentPage * pageSize);
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
    <Paper ref={paperRef} radius="lg" withBorder className={styles.tablePaper}>
      <ScrollArea className={styles.tableScroll}>
        <Table
          verticalSpacing="md"
          horizontalSpacing="md"
          highlightOnHover
          miw={950}
        >
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
            {loading &&
              Array.from({ length: pageSize }, (_, index) => (
                <Table.Tr key={`measurement-skeleton-${index}`} aria-hidden="true">
                  <Table.Td><Skeleton height={18} width="72%" /></Table.Td>
                  <Table.Td><Skeleton height={18} width="82%" /></Table.Td>
                  <Table.Td><Skeleton height={18} width="90%" /></Table.Td>
                  <Table.Td><Skeleton height={18} width="68%" /></Table.Td>
                  <Table.Td><Skeleton height={24} width={132} radius="sm" /></Table.Td>
                  <Table.Td><Skeleton height={36} width={44} radius="md" mx="auto" /></Table.Td>
                </Table.Tr>
              ))}
            {!loading && !visibleRecords.length && (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Text ta="center" c="dimmed" py="xl">
                    Ничего не найдено
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
            {!loading && visibleRecords.map((record) => (
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
      {loading && (
        <Group justify="space-between" p="md" className={styles.pagination}>
          <Skeleton height={16} width={170} />
          <Skeleton height={32} width={180} radius="sm" />
        </Group>
      )}
      {!loading && totalPages > 1 && (
        <Group justify="space-between" p="md" className={styles.pagination}>
          <Text size="sm" c="dimmed">
            Показано {(currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, records.length)} из {records.length}
          </Text>
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={onPageChange}
            withEdges
          />
        </Group>
      )}
    </Paper>
  );
}
