import {
  AnalysisForm,
  type AnalysisPayload,
  type Coordinate,
  type TerritoryMode,
} from "@/features/create-analysis";
import { ActionIcon, Box, Button, Group, Paper } from "@mantine/core";
import { IconAdjustmentsHorizontal, IconX } from "@tabler/icons-react";
import { useState } from "react";
import AnalysisBrand from "./AnalysisBrand";
import styles from "./AnalysisSidebar.module.css";

type AnalysisSidebarProps = {
  mode: TerritoryMode;
  closedCoordinates: Coordinate[];
  geometryIsValid: boolean;
  onModeChange: (mode: TerritoryMode) => void;
  onAnalysisStart: (payload: AnalysisPayload) => void;
};

export default function AnalysisSidebar(props: AnalysisSidebarProps) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button
        className={styles.mobileTrigger}
        leftSection={<IconAdjustmentsHorizontal size={18} stroke={1.7} />}
        onClick={() => setOpened(true)}
        radius="md"
        size="md"
      >
        Настроить анализ
      </Button>

      <Paper
        component="aside"
        radius="lg"
        shadow="xl"
        className={styles.sidebar}
        data-opened={opened || undefined}
      >
        <Box className={styles.brand}>
          <Group justify="space-between" wrap="nowrap">
            <AnalysisBrand />
            <ActionIcon
              className={styles.closeButton}
              variant="subtle"
              color="gray"
              aria-label="Закрыть меню анализа"
              onClick={() => setOpened(false)}
            >
              <IconX size={20} stroke={1.8} />
            </ActionIcon>
          </Group>
        </Box>
        <AnalysisForm {...props} />
      </Paper>
    </>
  );
}
