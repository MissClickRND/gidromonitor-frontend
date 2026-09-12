import { Group, Text, UnstyledButton } from "@mantine/core";
import { landingNavigation } from "../model/navigation";
import styles from "./LandingHeader.module.css";

type DesktopNavigationProps = {
  onNavigate: (path: string) => void;
};

export default function DesktopNavigation({
  onNavigate,
}: DesktopNavigationProps) {
  return (
    <Group
      component="nav"
      aria-label="Основная навигация"
      gap={54}
      className={styles.desktopNavigation}
    >
      {landingNavigation.map((item) => (
        <UnstyledButton
          key={item.path}
          className={styles.navigationLink}
          onClick={() => onNavigate(item.path)}
        >
          <Text component="span" fw="medium" c="white" size="xl">
            {item.label}
          </Text>
        </UnstyledButton>
      ))}
    </Group>
  );
}
