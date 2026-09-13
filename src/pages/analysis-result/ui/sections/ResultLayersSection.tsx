import { ActionIcon, Collapse, Group, Paper, Stack, Switch, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconLayersLinked } from "@tabler/icons-react";
import { useState } from "react";
import styles from "./ResultLayersSection.module.css";

const layerGroups = [
  [
    { label: "Вода до события", color: "#7eacc8" },
    { label: "Вода на пике", color: "#2267a9" },
    { label: "Новое затопление", color: "#e99a3f" },
    { label: "Убыль воды", color: "#8274b6" },
  ],
  [
    { label: "Sentinel-1 (SAR)", color: "#46849f" },
    { label: "Sentinel-2 (MSI)", color: "#9cc6d8" },
  ],
];

export function ResultLayersSection() {
  const [opened, { toggle }] = useDisclosure(true);
  const [enabledLayers, setEnabledLayers] = useState(() =>
    new Set(layerGroups.flat().map((layer) => layer.label)),
  );

  const toggleLayer = (label: string) => {
    setEnabledLayers((current) => {
      const next = new Set(current);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <Paper className={styles.panel} radius="lg" shadow="xl">
      <UnstyledButton className={styles.trigger} onClick={toggle} aria-expanded={opened}>
        <Group gap={9} wrap="nowrap">
          <IconLayersLinked size={18} stroke={1.8} />
          <Text fw={500} size="sm">Слои отображения</Text>
        </Group>
        <ActionIcon component="span" variant="subtle" color="gray" aria-hidden="true">
          <IconChevronDown className={styles.chevron} data-opened={opened || undefined} size={18} />
        </ActionIcon>
      </UnstyledButton>

      <Collapse in={opened} transitionDuration={220}>
        <Stack gap={0} className={styles.layers}>
          {layerGroups.map((group, groupIndex) => (
            <Stack key={groupIndex} gap={0} className={groupIndex ? styles.sensorGroup : undefined}>
              {group.map((layer) => (
                <Group key={layer.label} justify="space-between" wrap="nowrap" className={styles.layer}>
                  <Group gap={8} wrap="nowrap">
                    <span className={styles.dot} style={{ background: layer.color }} />
                    <Text size="xs">{layer.label}</Text>
                  </Group>
                  <Switch
                    checked={enabledLayers.has(layer.label)}
                    onChange={() => toggleLayer(layer.label)}
                    size="xs"
                    aria-label={`Показать слой «${layer.label}»`}
                  />
                </Group>
              ))}
            </Stack>
          ))}
        </Stack>
      </Collapse>
    </Paper>
  );
}
