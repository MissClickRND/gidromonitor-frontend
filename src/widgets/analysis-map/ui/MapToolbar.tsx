import {
  ActionIcon,
  Combobox,
  Loader,
  Paper,
  TextInput,
  Tooltip,
  useCombobox,
} from "@mantine/core";
import {
  IconMap2,
  IconSatellite,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { useMemo, useState, type KeyboardEvent } from "react";
import { cityOptions } from "../model/cities";
import type { CitySearchResult } from "../model/geocodeCity";
import styles from "./AnalysisMap.module.css";

type MapToolbarProps = {
  streetsView: boolean;
  onToggleStyle: () => void;
  onSearchCity: (query: string) => Promise<CitySearchResult | null>;
};

export default function MapToolbar({
  streetsView,
  onToggleStyle,
  onSearchCity,
}: MapToolbarProps) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.selectFirstOption(),
  });

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ru");

    if (!normalizedQuery) return cityOptions;

    return cityOptions.filter((city) =>
      city.name.toLocaleLowerCase("ru").includes(normalizedQuery),
    );
  }, [query]);

  const findCity = async () => {
    if (!query.trim()) return;
    setSearching(true);
    setSearchError(null);
    const city = await onSearchCity(query);
    setSearching(false);

    if (!city) {
      setSearchError("Город не найден");
      return;
    }

    setQuery(city.name);
    combobox.closeDropdown();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    void findCity();
  };

  const handleSuggestionSubmit = (value: string) => {
    setQuery(value);
    setSearchError(null);
    combobox.closeDropdown();
    setSearching(true);
    void onSearchCity(value).then((city) => {
      setSearching(false);
      if (!city) setSearchError("Город не найден");
    });
  };

  const clearSearch = () => {
    setQuery("");
    setSearchError(null);
    combobox.closeDropdown();
  };

  return (
    <Paper className={styles.toolbar} radius="lg" shadow="lg">
      <Paper className={styles.modeControl} radius="md" shadow="sm">
        <Tooltip
          label={
            streetsView
              ? "Включить спутниковую карту"
              : "Включить обычную карту"
          }
        >
          <ActionIcon
            size={36}
            variant="subtle"
            color="primary"
            aria-label={
              streetsView
                ? "Включить спутниковую карту"
                : "Включить обычную карту"
            }
            onClick={onToggleStyle}
          >
            {streetsView ? (
              <IconSatellite size={24} stroke={1.7} />
            ) : (
              <IconMap2 size={24} stroke={1.7} />
            )}
          </ActionIcon>
        </Tooltip>
      </Paper>

      <Paper className={styles.searchControl} radius="md" shadow="sm">
        <Combobox
          store={combobox}
          onOptionSubmit={handleSuggestionSubmit}
          withinPortal
        >
          <Combobox.Target>
            <TextInput
              value={query}
              onFocus={() => combobox.openDropdown()}
              onChange={(event) => {
                setQuery(event.currentTarget.value);
                setSearchError(null);
                combobox.openDropdown();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Найти город"
              aria-label="Найти город на карте"
              size="sm"
              error={searchError}
              className={styles.citySearch}
              rightSection={
                searching ? (
                  <Loader size={16} color="var(--mantine-color-primary-6)" />
                ) : query ? (
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    size="sm"
                    aria-label="Очистить поиск города"
                    onClick={clearSearch}
                  >
                    <IconX size={16} stroke={1.8} />
                  </ActionIcon>
                ) : (
                  <ActionIcon
                    variant="subtle"
                    color="primary"
                    size="sm"
                    aria-label="Найти город"
                    onClick={() => void findCity()}
                  >
                    <IconSearch size={16} stroke={1.8} />
                  </ActionIcon>
                )
              }
            />
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options className={styles.cityOptions}>
              {suggestions.length > 0 ? (
                suggestions.map((city) => (
                  <Combobox.Option
                    className={styles.cityOption}
                    key={city.name}
                    value={city.name}
                  >
                    {city.name}
                  </Combobox.Option>
                ))
              ) : (
                <Combobox.Empty>Нажмите Enter для поиска</Combobox.Empty>
              )}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Paper>
    </Paper>
  );
}
