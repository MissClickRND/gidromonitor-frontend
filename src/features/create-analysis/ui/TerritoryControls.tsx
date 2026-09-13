import {
  Group,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconPolygon,
  IconRectangle,
} from "@tabler/icons-react";
import type { TerritoryMode } from "../model/types";
import styles from "./AnalysisForm.module.css";

type TerritoryControlsProps = {
  mode: TerritoryMode;
  error: string | null;
  onModeChange: (mode: TerritoryMode) => void;
};

export default function TerritoryControls({
  mode,
  error,
  onModeChange,
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

      <Text fz="xs" c="dimmed" lh={1.35}>
        {mode === "polygon"
          ? "Кликайте по карте, чтобы добавить вершины. Нажмите на первую точку, чтобы замкнуть контур."
          : "Зажмите кнопку мыши и протяните по карте."}
      </Text>

      {error && (
        <Text fz="xs" c="red" role="alert">
          {error}
        </Text>
      )}
    </Stack>
  );
}
