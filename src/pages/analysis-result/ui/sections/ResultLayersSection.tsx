import type { ResultLayer } from "@/pages/analysis-result/model/layers";
import { ActionIcon, Checkbox, Group, Paper, Stack, Text } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconStackFront,
} from "@tabler/icons-react";
import { useState } from "react";
import styles from "./ResultLayersSection.module.css";

type ResultLayersSectionProps = {
  layers: ResultLayer[];
  activeLayerIds: string[];
  onActiveLayerIdsChange: (layerIds: string[]) => void;
};

export function ResultLayersSection({
  layers,
  activeLayerIds,
  onActiveLayerIdsChange,
}: ResultLayersSectionProps) {
  const [opened, setOpened] = useState(
    () =>
      typeof window === "undefined" ||
      window.matchMedia("(min-width: 48em)").matches,
  );
  const waterLayers = layers.filter((layer) => layer.group === "water");
  const satelliteLayers = layers.filter((layer) => layer.group === "satellite");

  return (
    <Paper
      className={styles.panel}
      data-opened={opened || undefined}
      radius="lg"
      shadow="xl"
    >
      <ActionIcon
        className={styles.toggleButton}
        size={44}
        radius={0}
        bg="#f7f9f9"
        variant="white"
        aria-label={
          opened ? "Закрыть слои отображения" : "Открыть слои отображения"
        }
        aria-expanded={opened}
        onClick={() => setOpened((current) => !current)}
      >
        {opened ? (
          <IconChevronRight size={28} stroke={1.8} />
        ) : (
          <IconChevronLeft size={28} stroke={1.8} />
        )}
      </ActionIcon>
      <div className={styles.content}>
        <Group gap={9} wrap="nowrap" className={styles.heading}>
          <IconStackFront size={18} stroke={1.8} />
          <Text fw={600} size="18px">
            Выбор слоя
          </Text>
        </Group>
        <Checkbox.Group
          value={activeLayerIds}
          onChange={onActiveLayerIdsChange}
          aria-label="Слои отображения"
        >
          <Stack gap={0} className={styles.layers}>
            {[waterLayers, satelliteLayers].map((group, groupIndex) => (
              <Stack
                key={groupIndex}
                gap={0}
                className={groupIndex ? styles.sensorGroup : undefined}
              >
                {group.map((layer) => (
                  <Checkbox
                    key={layer.label}
                    value={layer.id}
                    label={
                      <Group gap={8} wrap="nowrap">
                        <span
                          className={styles.dot}
                          style={{ background: layer.color }}
                        />
                        <Text size="xs">{layer.label}</Text>
                      </Group>
                    }
                    className={styles.layer}
                    size="sm"
                  />
                ))}
              </Stack>
            ))}
          </Stack>
        </Checkbox.Group>
      </div>
    </Paper>
  );
}
