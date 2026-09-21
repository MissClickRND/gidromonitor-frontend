import { Button, Group, Paper, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconCalendar, IconSearch, IconX } from "@tabler/icons-react";
import styles from "../Calculations.page.module.css";

type Props = {
  query: string;
  startDate: string | null;
  endDate: string | null;
  onQueryChange: (value: string) => void;
  onStartDateChange: (value: string | null) => void;
  onEndDateChange: (value: string | null) => void;
  onReset: () => void;
};

export default function MeasurementsFilters(props: Props) {
  return (
    <Paper radius="lg" p="md" withBorder className={styles.filters}>
      <Group align="flex-end" wrap="wrap">
        <TextInput
          className={styles.search}
          label="Поиск по названию"
          placeholder="Введите название"
          value={props.query}
          onChange={(event) => props.onQueryChange(event.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
        />
        <DateInput
          className={styles.date}
          label="Дата начала"
          placeholder="Выберите дату"
          value={props.startDate}
          onChange={props.onStartDateChange}
          valueFormat="DD.MM.YYYY"
          locale="ru"
          clearable
          leftSection={<IconCalendar size={16} />}
        />
        <DateInput
          className={styles.date}
          label="Дата конца"
          placeholder="Выберите дату"
          value={props.endDate}
          onChange={props.onEndDateChange}
          valueFormat="DD.MM.YYYY"
          locale="ru"
          clearable
          leftSection={<IconCalendar size={16} />}
        />
        <Button
          size="sm"
          variant="subtle"
          color="gray"
          leftSection={<IconX size={14} />}
          onClick={props.onReset}
        >
          Сбросить
        </Button>
      </Group>
    </Paper>
  );
}
