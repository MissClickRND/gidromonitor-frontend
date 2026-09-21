import {
  Badge,
  Drawer,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
  Button,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import type { MeasurementRecord } from "../../model/mock";
import styles from "../Calculations.page.module.css";

type Props = {
  record: MeasurementRecord | null;
  onClose: () => void;
  onView: () => void;
};
const dateFormatter = new Intl.DateTimeFormat("ru-RU");
const areaFormatter = new Intl.NumberFormat("ru-RU");
const colors: Record<MeasurementRecord["eventType"], string> = {
  "Новое затопление": "red",
  "Убыль воды": "orange",
  "Стабильное состояние": "blue",
};

export default function MeasurementPreviewDrawer({ record, onClose, onView }: Props) {
  return (
    <Drawer
      opened={Boolean(record)}
      onClose={onClose}
      position="right"
      title="Выбранное событие"
      size="md"
      classNames={{ body: styles.drawerBody }}
    >
      {record && (
        <Stack gap="lg">
          <Image
            src={record.previewImage}
            alt={`Превью: ${record.name}`}
            radius="md"
            h={220}
            fit="cover"
            fallbackSrc="/favicon.svg"
          />
          <Stack gap={5}>
            <Text size="sm" c="dimmed">
              {dateFormatter.format(new Date(`${record.eventDate}T00:00:00`))}
            </Text>
            <Title order={3}>{record.name}</Title>
          </Stack>
          <Paper withBorder radius="md" p="md">
            <Stack gap="sm">
              <Group justify="space-between">
                <Text c="dimmed">Тип события</Text>
                <Badge variant="light" color={colors[record.eventType]}>
                  {record.eventType}
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text c="dimmed">Площадь</Text>
                <Text fw={700}>{areaFormatter.format(record.area)} га</Text>
              </Group>
            </Stack>
          </Paper>
          <Button
            fullWidth
            rightSection={<IconArrowRight size={17} />}
            onClick={onView}
          >
            Просмотреть результат
          </Button>
        </Stack>
      )}
    </Drawer>
  );
}
