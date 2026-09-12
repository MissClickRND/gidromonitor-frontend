import { Group, Image, Title, UnstyledButton } from "@mantine/core";
import styles from "./LandingHero.module.css";

type LandingBrandProps = {
  onNavigate: (path: string) => void;
};

export default function LandingBrand({ onNavigate }: LandingBrandProps) {
  return (
    <UnstyledButton
      className={styles.brandButton}
      aria-label="Перейти на главную"
      onClick={() => onNavigate("/")}
    >
      <Group className={styles.brand} gap={8} align="center" wrap="nowrap">
        <Image src="/favicon.svg" alt="" w={40} h={40} />
        <Title order={2} c="white" fw="medium" className={styles.brandTitle}>
          ГидроМонитор
        </Title>
      </Group>
    </UnstyledButton>
  );
}
