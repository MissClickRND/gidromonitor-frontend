import {
  Box,
  CloseButton,
  Container,
  FocusTrap,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useHotkeys, useReducedMotion } from "@mantine/hooks";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, type RefObject } from "react";
import { howItWorksIntro, howItWorksSteps } from "../model/content";
import HowItWorksStep from "./HowItWorksStep";
import styles from "./HowItWorksPanel.module.css";

type HowItWorksPanelProps = {
  opened: boolean;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
};

export default function HowItWorksPanel({
  opened,
  returnFocusRef,
  onClose,
}: HowItWorksPanelProps) {
  const reduceMotion = useReducedMotion();

  useHotkeys([["Escape", () => opened && onClose()]]);

  useEffect(() => {
    if (!opened) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [opened]);

  return (
    <AnimatePresence onExitComplete={() => returnFocusRef.current?.focus()}>
      {opened && (
        <FocusTrap active>
          <motion.section
            role="dialog"
            aria-modal={true}
            aria-labelledby="how-it-works-title"
            className={styles.panel}
            initial={{ y: reduceMotion ? 0 : "100%" }}
            animate={{ y: 0 }}
            exit={{ y: reduceMotion ? 0 : "100%" }}
            transition={{
              duration: reduceMotion ? 0.01 : 0.62,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <FocusTrap.InitialFocus />
            <CloseButton
              aria-label="Закрыть описание"
              size="xl"
              c="white"
              className={styles.closeButton}
              onClick={onClose}
            />

            <Box className={styles.scrollArea}>
              <Container size="lg" py={{ base: 72, sm: 96 }}>
                <Stack gap={64} className={styles.panelContent}>
                  <Stack gap="lg" maw={850}>
                    <Text className={styles.eyebrow}>ГидроМонитор</Text>
                    <Title
                      id="how-it-works-title"
                      order={2}
                      className={styles.panelTitle}
                    >
                      Как это работает?
                    </Title>
                    <Stack gap="md">
                      {howItWorksIntro.map((paragraph) => (
                        <Text key={paragraph} className={styles.introText}>
                          {paragraph}
                        </Text>
                      ))}
                    </Stack>
                  </Stack>

                  <Box component="section" className={styles.roadmap}>
                    {howItWorksSteps.map((step) => (
                      <HowItWorksStep key={step.number} step={step} />
                    ))}
                  </Box>

                  {/* <Paper component="section" className={styles.updateCard} radius="lg" p={{ base: "lg", sm: 40 }}>
                    <Stack gap="md">
                      <Text className={styles.updateLabel}>Новые наблюдения</Text>
                      <Title order={3} className={styles.updateTitle}>
                        Инкрементальное обновление данных
                      </Title>
                      {incrementalUpdateParagraphs.map((paragraph) => (
                        <Text key={paragraph} c="gray.2" lh={1.7} maw={900}>
                          {paragraph}
                        </Text>
                      ))}
                    </Stack>
                  </Paper> */}
                </Stack>
              </Container>
            </Box>
          </motion.section>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
}
