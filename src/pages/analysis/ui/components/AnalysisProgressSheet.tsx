import { Button, Drawer, Stack, Text, Title } from "@mantine/core";
import AnalysisProcessingLoader from "./AnalysisProcessingLoader";
import styles from "./AnalysisProgressSheet.module.css";

type AnalysisProgressSheetProps = {
  opened: boolean;
  onFinish: () => void;
  onExitTransitionEnd: () => void;
};

export default function AnalysisProgressSheet({
  opened,
  onFinish,
  onExitTransitionEnd,
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
      onExitTransitionEnd={onExitTransitionEnd}
    >
      <Stack align="center" justify="center" className={styles.message}>
        <AnalysisProcessingLoader />
        <Stack align="center" gap={8} maw={500}>
          <Title order={2} ta="center" c="#173a4c">
            Проводится анализ
          </Title>
          <Text ta="center" c="dimmed" size="lg" aria-live="polite">
            Подождите, обычно это занимает 1–3 минуты.
          </Text>
        </Stack>
        <Button size="md" radius="md" onClick={onFinish}>
          Закончить анализ
        </Button>
      </Stack>
    </Drawer>
  );
}
