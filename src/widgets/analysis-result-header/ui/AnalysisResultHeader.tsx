import {
  ActionIcon,
  Box,
  Group,
  Image,
  Paper,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { IconMap2, IconPlus, IconSatellite } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePageTransition } from "@/shared/ui/page-transition";
import styles from "./AnalysisResultHeader.module.css";

type AnalysisResultHeaderProps = {
  areaId: string;
  streetsView: boolean;
  onToggleMapStyle: () => void;
};

const getResultNavigation = (areaId: string) => [
  { label: "Карта", path: `/analysis/result/${areaId}` },
  { label: "Аналитика", path: `/analysis/result/${areaId}/analytics` },
  { label: "Отчёт", path: `/analysis/result/${areaId}/report` },
];

export default function AnalysisResultHeader({
  areaId,
  streetsView,
  onToggleMapStyle,
}: AnalysisResultHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { navigateWithTransition } = usePageTransition();

  return (
    <>
      <Paper className={styles.brand} radius="md" shadow="md">
        <Group gap={8} wrap="nowrap">
          <Image src="/favicon.svg" alt="" w={32} h={32} />
          <Text fw={500} c="#173a4c" className={styles.brandName}>
            ГидроМонитор
          </Text>
        </Group>
      </Paper>

      <Box component="nav" aria-label="Разделы результата" className={styles.actions}>
        <Tooltip label="Новый анализ">
          <ActionIcon
          className={styles.newAnalysis}
          variant="filled"
          color="primary"
          aria-label="Новый анализ"
          onClick={() => navigateWithTransition("/analysis")}
          >
            <IconPlus size={19} stroke={2.2} />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          label={streetsView ? "Включить спутниковую карту" : "Включить обычную карту"}
        >
          <ActionIcon
            className={styles.mapStyleButton}
            variant="white"
            color="primary"
            aria-label={streetsView ? "Включить спутниковую карту" : "Включить обычную карту"}
            onClick={onToggleMapStyle}
          >
            {streetsView ? <IconSatellite size={20} /> : <IconMap2 size={20} />}
          </ActionIcon>
        </Tooltip>
        <Paper className={styles.secondaryNav} radius="md" shadow="md">
          {getResultNavigation(areaId).map((item) => {
            const active = location.pathname === item.path;
            return (
              <UnstyledButton
                key={item.path}
                className={styles.secondaryLink}
                data-active={active || undefined}
                aria-current={active ? "page" : undefined}
                onClick={() => !active && navigate(item.path)}
              >
                {item.label}
              </UnstyledButton>
            );
          })}
        </Paper>
      </Box>
    </>
  );
}
