import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { measurementRecords, type MeasurementRecord } from "../model/mock";
import MeasurementPreviewDrawer from "./components/MeasurementPreviewDrawer";
import MeasurementsFilters from "./components/MeasurementsFilters";
import MeasurementsTable from "./components/MeasurementsTable";
import styles from "./Calculations.page.module.css";
import { useNavigate } from "react-router-dom";

export default function CalculationsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedRecord, setSelectedRecord] =
    useState<MeasurementRecord | null>(null);

  const records = useMemo(() => {
    if (startDate && endDate && startDate > endDate) return [];
    const normalizedQuery = query.trim().toLocaleLowerCase("ru");
    return measurementRecords.filter(
      (record) =>
        (!normalizedQuery ||
          record.name.toLocaleLowerCase("ru").includes(normalizedQuery)) &&
        (!startDate || record.eventDate >= startDate) &&
        (!endDate || record.eventDate <= endDate),
    );
  }, [endDate, query, startDate]);

  const resetFilters = () => {
    setQuery("");
    setStartDate(null);
    setEndDate(null);
    setPage(1);
  };

  return (
    <Box component="main" className={styles.page}>
      <div className={styles.content}>
        <Group
          justify="space-between"
          align="flex-start"
          className={styles.heading}
        >
          <Stack gap={4}>
            <Title order={1}>Измерения</Title>
            <Text c="dimmed">
              История обнаруженных изменений водной поверхности
            </Text>
          </Stack>
          <Button
            leftSection={<IconPlus size={18} />}
            radius="md"
            onClick={() => navigate("/analysis")}
          >
            Создать измерение
          </Button>
        </Group>
        <MeasurementsFilters
          query={query}
          startDate={startDate}
          endDate={endDate}
          onQueryChange={(value) => {
            setQuery(value);
            setPage(1);
          }}
          onStartDateChange={(value) => {
            setStartDate(value);
            setPage(1);
          }}
          onEndDateChange={(value) => {
            setEndDate(value);
            setPage(1);
          }}
          onReset={resetFilters}
        />
        <MeasurementsTable
          records={records}
          page={page}
          onPageChange={setPage}
          onOpen={setSelectedRecord}
        />
      </div>
      <MeasurementPreviewDrawer
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </Box>
  );
}
