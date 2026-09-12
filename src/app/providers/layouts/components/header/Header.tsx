import {
  Group,
  Text,
  Image,
  Container,
  UnstyledButton,
  Box,
  Stack,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./classes/Header.module.css";

export default function Header() {
  const navigate = useNavigate();

  const links = [
    { label: "Главная", path: "/" },
    { label: "Анализ", path: "/analysis" },
    { label: "Измерения", path: "/calculations" },
    { label: "API", path: "/api" },
  ];

  return (
    <Box
      component="header"
      py="sm"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "white",
        borderBottom: "1px solid var(--mantine-color-gray-2)",
      }}
    >
      <Container size="xl">
        <Group justify="space-between" align="center">
          <Group
            gap={10}
            align="center"
            wrap="nowrap"
            className={classes.logo}
            onClick={() => navigate("/")}
          >
            <Image src="/favicon.svg" alt="Logo" width={40} height={40} />
            <Title>ГидроМонитор</Title>
          </Group>

          <Group gap={30} justify="center">
            {links.map((link) => (
              <UnstyledButton
                key={link.path}
                onClick={() => navigate(link.path!)}
              >
                <Stack gap={2}>
                  <Text
                    fz="sm"
                    fw={500}
                    c="dark.7"
                    style={{
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                    }}
                  >
                    {link.label}
                  </Text>
                  <Box
                    h={2}
                    w="100%"
                    bg="primary.6"
                    style={{
                      opacity: link.path === window.location.pathname ? 1 : 0,
                    }}
                  />
                </Stack>
              </UnstyledButton>
            ))}
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
