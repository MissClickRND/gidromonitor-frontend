import { Button, Group, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";
import { useCreateArea, type ICreateArea } from "@/entities/areas";
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
  closedCoordinates: Coordinate[];
  geometryIsValid: boolean;
  onModeChange: (mode: TerritoryMode) => void;
  onAnalysisStart: (payload: AnalysisPayload) => void;
};

function createUtcIsoDate(value: string | null) {
  if (!value) return "";

  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0)).toISOString();
}

function getDateInputValue(value: string) {
  return value ? value.slice(0, 10) : null;
}

export default function AnalysisForm({
  mode,
  closedCoordinates,
  geometryIsValid,
  onModeChange,
  onAnalysisStart,
}: AnalysisFormProps) {
  const [territoryError, setTerritoryError] = useState<string | null>(null);
  const { createAreaAsync, isLoading } = useCreateArea();
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

  const handleSubmit = form.onSubmit(async (values) => {
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

    const request: ICreateArea = {
      name: payload.name,
      geometry: payload.territory,
      dateBefore: new Date(payload.dateBefore),
      dateAfter: new Date(payload.dateAfter),
    };

    try {
      await createAreaAsync(request);
      onAnalysisStart(payload);
    } catch {
      // Ошибка уже отображается через уведомление useCreateArea.
    }
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
            error={territoryError}
            onModeChange={handleModeChange}
          />
        </FormSection>

        <FormSection number={3} title="Выберите даты">
          <Group grow align="flex-start" gap={10}>
            <DateInput
              size="md"
              label="Дата до"
              radius="md"
              value={getDateInputValue(form.values.dateBefore)}
              valueFormat="DD.MM.YYYY"
              locale="ru"
              clearable
              placeholder="До"
              error={form.errors.dateBefore}
              onBlur={() => form.validateField("dateBefore")}
              onChange={(value) => form.setFieldValue("dateBefore", createUtcIsoDate(value))}
            />
            <DateInput
              size="md"
              label="Дата после"
              radius="md"
              placeholder="После"
              value={getDateInputValue(form.values.dateAfter)}
              minDate={getDateInputValue(form.values.dateBefore) || undefined}
              valueFormat="DD.MM.YYYY"
              locale="ru"
              clearable
              error={form.errors.dateAfter}
              onBlur={() => form.validateField("dateAfter")}
              onChange={(value) => form.setFieldValue("dateAfter", createUtcIsoDate(value))}
            />
          </Group>
        </FormSection>
      </Stack>

      <Button
        type="submit"
        loading={isLoading}
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
