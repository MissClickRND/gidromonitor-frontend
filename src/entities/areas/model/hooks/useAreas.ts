import { useQuery } from "@tanstack/react-query";
import { getAreas } from "../api/api";

export const areasQueryKey = ["areas"] as const;

export const useAreas = () =>
  useQuery({
    queryKey: areasQueryKey,
    queryFn: getAreas,
  });
