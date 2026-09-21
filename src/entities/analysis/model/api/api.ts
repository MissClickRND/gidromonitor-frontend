import { apiClient } from "@/shared/api";
import { endpoints } from "@/shared/config";
import type { ILayersResponse } from "../type";

export const getLayersById = async (id: string): Promise<ILayersResponse> => {
  const res = await apiClient.get<ILayersResponse>(
    endpoints.GET_LAYERS_BY_ID(id),
  );
  if (res.status !== 200 && res.status !== 201)
    throw new Error("Ошибка получения");

  return res.data;
};
