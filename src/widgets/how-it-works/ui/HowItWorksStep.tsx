import { Box, Paper, Stack, Text, Title } from "@mantine/core";
import type { HowItWorksStepData } from "../model/content";
import styles from "./HowItWorksPanel.module.css";

type HowItWorksStepProps = {
  step: HowItWorksStepData;
};

export default function HowItWorksStep({ step }: HowItWorksStepProps) {
  return (
    <Box component="article" className={styles.roadmapItem}>
      <Text className={styles.stepNumber}>{step.number}</Text>
      <Paper className={styles.stepCard} radius="lg" p={{ base: "lg", sm: "xl" }}>
        <Stack gap="md">
          <Title order={3} className={styles.stepTitle}>
            {step.title}
          </Title>
          <Stack gap="sm">
            {step.paragraphs.map((paragraph) => (
              <Text key={paragraph} c="gray.3" lh={1.65}>
                {paragraph}
              </Text>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
