import {
  ActionIcon,
  Group,
  SegmentedControl,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowBackUp,
  IconPolygon,
  IconRectangle,
  IconTrash,
} from "@tabler/icons-react";
import type { TerritoryMode } from "../model/types";
import styles from "./AnalysisForm.module.css";

type TerritoryControlsProps = {
  mode: TerritoryMode;
  canEdit: boolean;
  error: string | null;
  onModeChange: (mode: TerritoryMode) => void;
  onUndo: () => void;
  onClear: () => void;
};

export default function TerritoryControls({
  mode,
  canEdit,
  error,
  onModeChange,
  onUndo,
  onClear,
}: TerritoryControlsProps) {
  return (
    <Stack gap={10}>
      <SegmentedControl
        size="xl"
        fullWidth
        value={mode}
        onChange={(value) => onModeChange(value as TerritoryMode)}
        classNames={{
          root: styles.segmentedRoot,
          label: styles.segmentedLabel,
        }}
        data={[
          {
            value: "polygon",
            label: (
              <Group gap={6} justify="center" wrap="nowrap">
                <IconPolygon size={16} stroke={1.7} />
                <span>По точкам</span>
              </Group>
            ),
          },
          {
            value: "rectangle",
            label: (
              <Group gap={6} justify="center" wrap="nowrap">
                <IconRectangle size={16} stroke={1.7} />
                <span>Прямоугольник</span>
              </Group>
            ),
          },
        ]}
      />

      <Group gap={8}>
        <Tooltip label="Отменить последний шаг">
          <ActionIcon
            type="button"
            variant="default"
            size="md"
            aria-label="Отменить последний шаг"
            disabled={!canEdit}
            onClick={onUndo}
          >
            <IconArrowBackUp size={18} stroke={1.6} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Удалить область">
          <ActionIcon
            type="button"
            variant="default"
            size="md"
            color="red"
            aria-label="Удалить область"
            disabled={!canEdit}
            onClick={onClear}
          >
            <IconTrash size={18} stroke={1.6} />
          </ActionIcon>
        </Tooltip>
        <Text fz="xs" c="dimmed" lh={1.35}>
          {mode === "polygon"
            ? "Кликайте по карте, чтобы добавить вершины."
            : "Зажмите кнопку мыши и протяните по карте."}
        </Text>
      </Group>

      {error && (
        <Text fz="xs" c="red" role="alert">
          {error}
        </Text>
      )}
    </Stack>
  );
}
