import { useQuery } from "@tanstack/react-query";
import { getLayersById } from "../api/api";

export const useLayersById = (id?: string) =>
  useQuery({
    queryKey: ["analysis-layers", id],
    queryFn: () => getLayersById(id as string),
    enabled: Boolean(id),
  });
