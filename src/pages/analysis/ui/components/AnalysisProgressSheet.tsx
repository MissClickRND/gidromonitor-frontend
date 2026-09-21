import type { IAreaResponse } from "@/entities/areas";
import { LoaderLogo } from "@/shared/ui/loader-logo";
import { Button, Drawer, Stack, Text, Title } from "@mantine/core";
import styles from "./AnalysisProgressSheet.module.css";

type AnalysisProgressSheetProps = {
  opened: boolean;
  area: IAreaResponse | null;
  onClose: () => void;
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" });

function formatDate(value: Date) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : dateFormatter.format(date);
}

export default function AnalysisProgressSheet({
  opened,
  area,
  onClose,
}: AnalysisProgressSheetProps) {
  return (
    <Drawer
      opened={opened}
      onClose={() => undefined}
      position="bottom"
      size="100%"
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      lockScroll
      zIndex={300}
      classNames={{
        content: styles.content,
        body: styles.body,
      }}
    >
      <Stack align="center" justify="center" className={styles.message}>
        <LoaderLogo label="Анализ выполняется" />
        <Stack align="center" gap={8} maw={500}>
          <Title order={2} ta="center" c="#173a4c">
            Анализ запущен
          </Title>
          <Text ta="center" c="dimmed" size="lg" aria-live="polite">
            Сервер принял заявку и обрабатывает данные. Обычно это занимает 1–3 минуты.
          </Text>
        </Stack>
        {area && (
          <Stack align="center" gap={4}>
            <Text fw={600}>{area.name}</Text>
            <Text size="sm" c="dimmed">
              Период: {formatDate(area.dateBefore)} — {formatDate(area.dateAfter)}
            </Text>
          </Stack>
        )}
        <Button size="md" radius="md" onClick={onClose}>
          Закрыть
        </Button>
      </Stack>
    </Drawer>
  );
}
