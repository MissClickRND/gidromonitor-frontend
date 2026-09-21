import { useQuery } from "@tanstack/react-query";
import { getAreaById } from "../api/api";

export const useArea = (id?: string) =>
  useQuery({
    queryKey: ["area", id],
    queryFn: () => getAreaById(id as string),
    enabled: Boolean(id),
  });
