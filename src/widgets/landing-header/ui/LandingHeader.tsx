import { Box, Group, Image, Title, UnstyledButton } from "@mantine/core";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import styles from "./LandingHeader.module.css";

type LandingHeaderProps = {
  onNavigate: (path: string) => void;
};

export default function LandingHeader({ onNavigate }: LandingHeaderProps) {
  return (
    <Box component="header" className={styles.header}>
      <Group
        justify="space-between"
        align="center"
        wrap="nowrap"
        className={styles.headerContent}
      >
        <UnstyledButton
          aria-label="Перейти на главную"
          onClick={() => onNavigate("/")}
          className={styles.logoButton}
        >
          <Group gap={8} align="center" wrap="nowrap">
            <Image src="/favicon.svg" alt="" w={40} h={40} />
            <Title c="white" fw="medium" fz="h2" className={styles.logoTitle}>
              ГидроМонитор
            </Title>
          </Group>
        </UnstyledButton>

        <DesktopNavigation onNavigate={onNavigate} />
        <MobileNavigation onNavigate={onNavigate} />
        <Box className={styles.desktopSpacer} aria-hidden="true" />
      </Group>
    </Box>
  );
}
