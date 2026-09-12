import { usePageTransition } from "@/shared/ui/page-transition";
import { Box, Group, Paper, UnstyledButton } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { analysisNavigation } from "./navigation";
import styles from "./AnalysisNavigation.module.css";

export default function AnalysisNavigation() {
  const location = useLocation();
  const { navigateWithTransition } = usePageTransition();

  return (
    <Box component="nav" aria-label="Основная навигация" className={styles.wrapper}>
      <Paper radius="xl" shadow="lg" className={styles.island}>
        <Group gap={4} wrap="nowrap" justify="center">
          {analysisNavigation.map((item) => {
            const active =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);
            return (
              <UnstyledButton
                key={item.path}
                className={styles.link}
                data-active={active || undefined}
                aria-current={active ? "page" : undefined}
                onClick={() => !active && navigateWithTransition(item.path)}
              >
                {item.label}
              </UnstyledButton>
            );
          })}
        </Group>
      </Paper>
    </Box>
  );
}
