import { Box, Group, Text } from "@mantine/core";
import type { ReactNode } from "react";
import styles from "./AnalysisForm.module.css";

type FormSectionProps = {
  number: number;
  title: string;
  children: ReactNode;
};

export default function FormSection({ number, title, children }: FormSectionProps) {
  return (
    <Box component="section">
      <Group gap={9} mb={12} wrap="nowrap">
        <Box className={styles.stepNumber}>{number}</Box>
        <Text fw={500} fz="sm" c="#173a4c">
          {title}
        </Text>
      </Group>
      {children}
    </Box>
  );
}
