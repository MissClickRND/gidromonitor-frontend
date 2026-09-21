import {
  ActionIcon,
  Collapse,
  Group,
  Paper,
  Radio,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
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
  const [selectedLayer, setSelectedLayer] = useState(layerGroups[0][0].label);

  return (
    <Paper className={styles.panel} radius="lg" shadow="xl">
      <UnstyledButton
        className={styles.trigger}
        onClick={toggle}
        aria-expanded={opened}
      >
        <Group gap={9} wrap="nowrap">
          <IconLayersLinked size={18} stroke={1.8} />
          <Text fw={500} size="sm">
            Слои отображения
          </Text>
        </Group>
        <ActionIcon
          component="span"
          variant="subtle"
          color="gray"
          aria-hidden="true"
        >
          <IconChevronDown
            className={styles.chevron}
            data-opened={opened || undefined}
            size={18}
          />
        </ActionIcon>
      </UnstyledButton>

      <Collapse expanded={opened} transitionDuration={220}>
        <Radio.Group
          value={selectedLayer}
          onChange={setSelectedLayer}
          aria-label="Слой отображения"
        >
          <Stack gap={0} className={styles.layers}>
            {layerGroups.map((group, groupIndex) => (
              <Stack
                key={groupIndex}
                gap={0}
                className={groupIndex ? styles.sensorGroup : undefined}
              >
                {group.map((layer) => (
                  <Radio
                    key={layer.label}
                    value={layer.label}
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
                    size="xs"
                  />
                ))}
              </Stack>
            ))}
          </Stack>
        </Radio.Group>
      </Collapse>
    </Paper>
  );
}
