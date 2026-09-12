import { Burger, Paper, Stack, Text, UnstyledButton } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { landingNavigation } from "../model/navigation";
import styles from "./LandingHeader.module.css";

type MobileNavigationProps = {
  onNavigate: (path: string) => void;
};

export default function MobileNavigation({ onNavigate }: MobileNavigationProps) {
  const reduceMotion = useReducedMotion();
  const pendingPathRef = useRef<string | null>(null);
  const [opened, setOpened] = useState(false);

  const handleNavigate = (path: string) => {
    pendingPathRef.current = path;
    setOpened(false);
  };

  const handleMenuExit = () => {
    if (pendingPathRef.current) {
      onNavigate(pendingPathRef.current);
      pendingPathRef.current = null;
    }
  };

  return (
    <>
      <Burger
        opened={opened}
        onClick={() => setOpened((value) => !value)}
        aria-label={opened ? "Закрыть меню" : "Открыть меню"}
        color="white"
        className={styles.mobileBurger}
      />

      <AnimatePresence onExitComplete={handleMenuExit}>
        {opened && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Paper component="nav" aria-label="Мобильная навигация" className={styles.mobileMenuSurface} radius="md" p="sm">
              <Stack gap={4}>
                {landingNavigation.map((item) => (
                  <UnstyledButton key={item.path} className={styles.mobileLink} onClick={() => handleNavigate(item.path)}>
                    <Text c="white" fw={500}>
                      {item.label}
                    </Text>
                  </UnstyledButton>
                ))}
              </Stack>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
