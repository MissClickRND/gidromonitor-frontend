import { Button, Group, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";
import type {
  AnalysisFormValues,
  AnalysisPayload,
  Coordinate,
  TerritoryMode,
} from "../model/types";
import FormSection from "./FormSection";
import TerritoryControls from "./TerritoryControls";
import styles from "./AnalysisForm.module.css";

type AnalysisFormProps = {
  mode: TerritoryMode;
  coordinates: Coordinate[];
  closedCoordinates: Coordinate[];
  geometryIsValid: boolean;
  onModeChange: (mode: TerritoryMode) => void;
  onUndo: () => void;
  onClear: () => void;
  onAnalysisStart: (payload: AnalysisPayload) => void;
};

export default function AnalysisForm({
  mode,
  coordinates,
  closedCoordinates,
  geometryIsValid,
  onModeChange,
  onUndo,
  onClear,
  onAnalysisStart,
}: AnalysisFormProps) {
  const [territoryError, setTerritoryError] = useState<string | null>(null);
  const form = useForm<AnalysisFormValues>({
    mode: "controlled",
    initialValues: {
      name: "",
      territoryMode: mode,
      dateBefore: "",
      dateAfter: "",
    },
    validateInputOnBlur: true,
    validate: (values) => ({
      name: values.name.trim() ? null : "Введите название анализа",
      dateBefore: values.dateBefore ? null : "Выберите дату до",
      dateAfter: !values.dateAfter
        ? "Выберите дату после"
        : values.dateBefore && values.dateAfter < values.dateBefore
          ? "Дата после не может быть раньше даты до"
          : null,
    }),
  });

  const handleModeChange = (nextMode: TerritoryMode) => {
    form.setFieldValue("territoryMode", nextMode);
    setTerritoryError(null);
    onModeChange(nextMode);
  };

  const handleSubmit = form.onSubmit((values) => {
    if (!geometryIsValid) {
      setTerritoryError(
        mode === "polygon"
          ? "Добавьте минимум три точки на карте"
          : "Выделите прямоугольную область на карте",
      );
      return;
    }

    setTerritoryError(null);
    const payload: AnalysisPayload = {
      ...values,
      name: values.name.trim(),
      territoryMode: mode,
      territory: {
        type: "Polygon",
        coordinates: [closedCoordinates],
      },
    };

    console.log("Создание анализа", payload);
    onAnalysisStart(payload);
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Stack gap={24}>
        <FormSection number={1} title="Введите название анализа">
          <TextInput
            size="md"
            aria-label="Название анализа"
            placeholder="Например, паводок на реке Зея"
            radius="md"
            {...form.getInputProps("name")}
          />
        </FormSection>

        <FormSection number={2} title="Выберите территорию">
          <TerritoryControls
            mode={mode}
            canEdit={coordinates.length > 0}
            error={territoryError}
            onModeChange={handleModeChange}
            onUndo={onUndo}
            onClear={onClear}
          />
        </FormSection>

        <FormSection number={3} title="Выберите даты">
          <Group grow align="flex-start" gap={10}>
            <DateInput
              size="md"
              label="Дата до"
              radius="md"
              value={form.values.dateBefore || null}
              valueFormat="DD.MM.YYYY"
              locale="ru"
              clearable
              placeholder="До"
              error={form.errors.dateBefore}
              onBlur={() => form.validateField("dateBefore")}
              onChange={(value) =>
                form.setFieldValue("dateBefore", value ?? "")
              }
            />
            <DateInput
              size="md"
              label="Дата после"
              radius="md"
              placeholder="После"
              value={form.values.dateAfter || null}
              minDate={form.values.dateBefore || undefined}
              valueFormat="DD.MM.YYYY"
              locale="ru"
              clearable
              error={form.errors.dateAfter}
              onBlur={() => form.validateField("dateAfter")}
              onChange={(value) => form.setFieldValue("dateAfter", value ?? "")}
            />
          </Group>
        </FormSection>
      </Stack>

      <Button
        type="submit"
        size="md"
        radius="md"
        fullWidth
        rightSection={<IconArrowRight size={18} stroke={1.6} />}
        className={styles.submitButton}
      >
        Запустить анализ
      </Button>
    </form>
  );
}
