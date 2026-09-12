import { Box, Button, Group, Stack, Title } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { motion } from "motion/react";
import type { RefObject } from "react";
import styles from "./LandingHero.module.css";

type LandingHeroProps = {
  howItWorksButtonRef: RefObject<HTMLButtonElement | null>;
  onNavigate: (path: string) => void;
  onOpenHowItWorks: () => void;
};

const MotionStack = motion.create(Stack);

export default function LandingHero({
  howItWorksButtonRef,
  onNavigate,
  onOpenHowItWorks,
}: LandingHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Box component="main" className={styles.page}>
      <Box className={styles.hero}>
        <MotionStack
          align="center"
          gap={26}
          className={styles.content}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0.01 : 0.72,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Title order={1} className={styles.title}>
            <Box component="span" className={styles.titleLine}>
              <Box component="span" className={styles.scriptInitial}>
                М
              </Box>
              ониторинг водных
            </Box>
            <Box component="span" className={styles.titleLine}>
              объектов и паводков из космоса
            </Box>
          </Title>

          <Group gap={14} justify="center" className={styles.actions}>
            <motion.div
              className={styles.actionMotion}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              <Button
                className={styles.primaryAction}
                size="lg"
                radius="md"
                onClick={() => onNavigate("/analysis")}
              >
                Новый анализ
              </Button>
            </motion.div>
            <motion.div
              className={styles.actionMotion}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              <Button
                ref={howItWorksButtonRef}
                className={styles.secondaryAction}
                size="lg"
                radius="md"
                variant="white"
                onClick={onOpenHowItWorks}
              >
                Как это работает?
              </Button>
            </motion.div>
          </Group>
        </MotionStack>
      </Box>
    </Box>
  );
}
