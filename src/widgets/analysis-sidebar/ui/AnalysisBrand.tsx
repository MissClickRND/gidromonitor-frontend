import { Group, Image, Title } from "@mantine/core";

export default function AnalysisBrand() {
  return (
    <Group gap={8} wrap="nowrap">
      <Image src="/favicon.svg" alt="" w={40} h={40} />
      <Title order={2} c="#173a4c">
        ГидроМонитор
      </Title>
    </Group>
  );
}
